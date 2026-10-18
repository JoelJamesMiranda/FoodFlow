import db from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const { latitude, longitude } = await request.json();

        if (
            typeof latitude !== "number" ||
            typeof longitude !== "number"
        ) {
            return Response.json(
                { error: "Invalid coordinates" },
                { status: 400 }
            );
        }

        if (
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180
        ) {
            return Response.json(
                { error: "Coordinates out of range" },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value;

        if (!token) {
            return Response.json(
                { error: "Not logged in" },
                { status: 401 }
            );
        }

        const [users] = await db.query(
            `
            SELECT user_id
            FROM sessions
            WHERE session_token = ?
            AND expires_at > NOW()
            `,
            [token]
        );

        if (users.length === 0) {
            return Response.json(
                { error: "Invalid or expired session" },
                { status: 401 }
            );
        }

        const volunteerId = users[0].user_id;

        await db.query(
            `
            INSERT INTO volunteer_locations
            (
                volunteer_id,
                latitude,
                longitude
            )
            VALUES (?, ?, ?)

            ON DUPLICATE KEY UPDATE
                latitude = VALUES(latitude),
                longitude = VALUES(longitude),
                recorded_at = CURRENT_TIMESTAMP
            `,
            [
                volunteerId,
                latitude,
                longitude
            ]
        );

        return Response.json({
            success: true,
            message: "Volunteer location updated"
        });

    } catch (error) {
        console.error("POST /api/volunteer/location:", error);

        return Response.json(
            {
                success: false,
                error: "Failed to update volunteer location"
            },
            { status: 500 }
        );
    }
}