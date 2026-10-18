import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value

        const [rows] = await db.query("SELECT * FROM sessions WHERE session_token = ? ", [token])

        if (rows.length === 0) {
            return Response.json(
                { error: "No logged user" },
                { status: 402 }
            );
        }

        const userId = rows[0].user_id;

        const [user] = await db.query("SELECT * FROM users WHERE id = ? ", [userId]);

        const [address] = await db.query("SELECT * FROM addresses WHERE userId = ? ", [userId]);

        return Response.json({
            users: user[0],
            addresses: address[0]
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