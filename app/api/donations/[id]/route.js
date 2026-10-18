import db from "@/lib/db";
import { cookies } from "next/headers";

export async function PATCH(request , {params}) {
    try {
        const { id } = await params ;

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

        await db.query(`UPDATE donations SET status = 'CANCELLED' WHERE donor_id = ? AND id = ?     ₹1`, [user_id , id])

        return Response.json({
            success: true,
            message: "Donation deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}