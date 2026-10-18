import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import db from "@/lib/db";

export async function POST(request) {
    try {
        const body = await request.json();

        const { deliveryId } = body;

        if (!deliveryId) {
            return NextResponse.json(
                { error: "Delivery ID is required" },
                { status: 400 }
            );
        }

        // Get logged-in volunteer
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("session_token")?.value;

        if (!sessionToken) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const [sessions] = await db.query(
            `SELECT user_id
             FROM sessions
             WHERE session_token = ?
             AND expires_at > NOW()`,
            [sessionToken]
        );

        if (sessions.length === 0) {
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }

        const volunteerId = sessions[0].user_id;

        // Get delivery
        const [deliveries] = await db.query(
            `SELECT id, volunteer_id, status,
                    donorLat, donorLong,
                    recLat, recLong
             FROM deliveries
             WHERE id = ?
             AND volunteer_id = ?`,
            [deliveryId, volunteerId]
        );

        if (deliveries.length === 0) {
            return NextResponse.json(
                { error: "Delivery not found" },
                { status: 404 }
            );
        }

        const delivery = deliveries[0];

        // Get latest volunteer location
        const [locations] = await db.query(
            `SELECT latitude, longitude
             FROM volunteer_locations
             WHERE volunteer_id = ?
             ORDER BY recorded_at DESC
             LIMIT 1`,
            [volunteerId]
        );

        if (locations.length === 0) {
            return NextResponse.json(
                { error: "Volunteer location not available" },
                { status: 400 }
            );
        }

        const volunteerLocation = locations[0];

        // Decide destination
        let destinationLat;
        let destinationLong;

        if (delivery.status === "CLAIMED") {
            destinationLat = delivery.donorLat;
            destinationLong = delivery.donorLong;
        } else if (
            delivery.status === "PICKED_UP" ||
            delivery.status === "ON_THE_WAY"
        ) {
            destinationLat = delivery.recLat;
            destinationLong = delivery.recLong;
        } else {
            return NextResponse.json(
                { error: "Route is not available for this delivery" },
                { status: 400 }
            );
        }

        if (
            destinationLat === null ||
            destinationLong === null
        ) {
            return NextResponse.json(
                { error: "Destination coordinates are missing" },
                { status: 400 }
            );
        }

        // Mapbox Directions API
        const coordinates =
            `${volunteerLocation.longitude},${volunteerLocation.latitude};` +
            `${destinationLong},${destinationLat}`;

        const mapboxResponse = await fetch(
            `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?overview=false&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`
        );

        const mapboxData = await mapboxResponse.json();

        if (!mapboxResponse.ok || !mapboxData.routes?.length) {
            console.error("Mapbox error:", mapboxData);

            return NextResponse.json(
                { error: "Unable to calculate route" },
                { status: 500 }
            );
        }

        console.log("Volunteer:", {
            latitude: volunteerLocation.latitude,
            longitude: volunteerLocation.longitude
        });

        console.log("Donor:", {
            latitude: destinationLat,
            longitude: destinationLong
        });

        const route = mapboxData.routes[0];

        await db.execute(
            `UPDATE deliveries
            SET remaining_distance = ?,
            estimated_time = ?,
            route_updated_at = NOW()
            WHERE id = ?`,
            [route.distance, route.duration, deliveryId]
        );

        return NextResponse.json({
            distance: route.distance,
            duration: route.duration
        });

    } catch (error) {
        console.error("Route API error:", error);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}