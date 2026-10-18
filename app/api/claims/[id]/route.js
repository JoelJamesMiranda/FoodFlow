import db from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request, { params }) {
    try {
        const donation = await params;
        const data = await request.json();

        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value

        if (!token) {
            return Response.json(
                { error: "no logged users" },
                { status: 404 }
            )
        }

        const [userid] = await db.query(
            "SELECT user_id FROM sessions WHERE session_token = ? AND expires_at > NOW()",
            [token]
        );

        if (userid.length === 0) {
            return Response.json(
                { error: "Invalid or expired session" },
                { status: 401 }
            );
        }

        console.log("Donation Id : ", donation.id)

        const [row] = await db.query(`SELECT status FROM donations where id = ?`, [donation.id])

        if (row[0].status === "CLAIMED") {
            return Response.json(
                { error: "Sorry, this order is already taken" },
                { status: 409 }
            );
        }

        const user_id = userid[0].user_id;

        await db.query('INSERT INTO claims (donation_id, receiver_id, distance, status) VALUE ( ?, ? , ?, "PENDING")', [donation.id, user_id, data.distance,])

        await db.query(`UPDATE donations SET status = 'CLAIMED' WHERE id = ? `, [donation.id])

        return Response.json({
            success: true,
            message: "Receiver details posted successfull!!"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}