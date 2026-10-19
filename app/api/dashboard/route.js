import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value

        if (!token) {
            return Response.json(
                { error: "no logged users" },
                { status: 404 }
            )
        }

        const [userid] = await db.query(
            `SELECT user_id FROM sessions WHERE session_token = ? AND expires_at > NOW()`,
            [token]
        );

        if (userid.length === 0) {
            return Response.json(
                { error: "Invalid or expired session" },
                { status: 401 }
            );
        }

        const user_id = userid[0].user_id;

        const [rows] = await db.query(`SELECT
    (SELECT COUNT(*)
     FROM donations
     WHERE status = 'AVAILABLE') AS totalDonations,

    (SELECT COUNT(*)
     FROM donations
     WHERE donor_id = ?) AS mealsShared,

    (SELECT COUNT(*)
     FROM claims
     WHERE receiver_id = ?
       AND status = 'DELIVERED') AS mealsReceived,

    (SELECT COUNT(*)
     FROM deliveries
     WHERE volunteer_id = ?
       AND status = 'DELIVERED') AS deliveriesCompleted`, [user_id, user_id, user_id]) 

        return Response.json(
            {
                data: rows[0],
                message: "Fetched Receiver Data successfully"
            }
        );

    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                error: "Failed to Fetch user details",
            },
            { status: 500 }
        );
    }
}



