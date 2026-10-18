import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value;

        if (!token) {
            return Response.json(
                { error: "No logged-in user" },
                { status: 401 }
            );
        }

        // Authenticate the logged-in user.
        const [users] = await db.query(
            `SELECT user_id
         FROM sessions
         WHERE session_token = ?
           AND expires_at > NOW()`,
            [token]
        );

        if (users.length === 0) {
            return Response.json(
                { error: "Invalid or expired session" },
                { status: 401 }
            );
        }

        const userId = users[0].user_id;

        // Fetch order history for the logged-in receiver.
        const [myRequests] = await db.query(
            `SELECT
            donations.id,
            users.name AS donorName,
            donations.image,
            donations.foodName,
            donations.category,
            donations.quantity,
            donations.unit,
            claims.distance,
            claims.created_at AS requestedAt,
            claims.status,
            claims.receiver_id
        FROM claims
        INNER JOIN donations
            ON donations.id = claims.donation_id
        INNER JOIN users
            ON users.id = donations.donor_id
        WHERE claims.receiver_id = ?
        ORDER BY claims.created_at DESC`,
            [userId]
        );

        // Fetch active deliveries and their saved route estimates.
        const [activeOrders] = await db.query(
            `SELECT
            donations.id AS id,
            claims.id AS claimId,
            deliveries.id AS deliveryId,
            claims.receiver_id,
            claims.created_at AS requestedAt,
            claims.status,

            donations.foodName,
            donations.quantity,
            donations.unit,
            donations.image,

            donor.name AS donorName,
            volunteer.name AS volunteerName,

            deliveries.status AS deliveryStatus,
            deliveries.remaining_distance,
            deliveries.estimated_time,
            deliveries.route_updated_at,

            deliveries.donorLat,
            deliveries.donorLong,
            deliveries.recLat,
            deliveries.recLong,

            volLoc.latitude AS volLat,
            volLoc.longitude AS volLong,
            volLoc.recorded_at AS locationUpdatedAt

        FROM claims

        INNER JOIN donations
            ON donations.id = claims.donation_id

        INNER JOIN deliveries
            ON deliveries.claim_id = claims.id

        INNER JOIN users AS donor
            ON donor.id = donations.donor_id

        INNER JOIN users AS volunteer
            ON volunteer.id = deliveries.volunteer_id

        LEFT JOIN volunteer_locations AS volLoc
            ON volLoc.id = (
                SELECT vl.id
                FROM volunteer_locations AS vl
                WHERE vl.volunteer_id = deliveries.volunteer_id
                ORDER BY vl.recorded_at DESC, vl.id DESC
                LIMIT 1
            )

        WHERE claims.receiver_id = ?
          AND claims.status IN (
              'VOLUNTEER_ASSIGNED',
              'PICKED_UP',
              'ON_THE_WAY'
          )
          AND deliveries.status IN (
              'CLAIMED',
              'PICKED_UP',
              'ON_THE_WAY',
              'PENDING'
          )

        ORDER BY claims.created_at DESC`,
            [userId]
        );

        // Convert saved Mapbox values into frontend-friendly units.
        const processedActiveOrders = activeOrders.map((order) => {
            const distanceMeters =
                order.remaining_distance == null
                    ? null
                    : Number(order.remaining_distance);

            const timeSeconds =
                order.estimated_time == null
                    ? null
                    : Number(order.estimated_time);

            return {
                ...order,

                // Distance in kilometres.
                distance:
                    distanceMeters != null &&
                        Number.isFinite(distanceMeters)
                        ? Number((distanceMeters / 1000).toFixed(2))
                        : null,

                // ETA in minutes.
                eta:
                    timeSeconds != null &&
                        Number.isFinite(timeSeconds)
                        ? Math.ceil(timeSeconds / 60)
                        : null,
            };
        });

        return Response.json({
            success: true,
            activeOrder: processedActiveOrders[0] || null,
            activeOrders: processedActiveOrders,
            myRequests,
            message: "Fetched user orders successfully",
        });
    } catch (error) {
        console.error("My orders API error:", error);

        return Response.json(
            {
                success: false,
                error: "Failed to fetch user orders",
            },
            { status: 500 }
        );
    }

}
