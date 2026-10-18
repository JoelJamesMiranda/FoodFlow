import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value

        const [rows] = await db.query(`SELECT * FROM sessions WHERE session_token = ? `, [token])

        if (rows.length === 0) {
            return Response.json(
                {error: "No logged user"},
                {status: 402}
            );
        }

        console.log(rows[0]);

        return Response.json(
                {message: rows[0].user_id},
            );
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                success: false,
                error: "Database connection failed",
            },
            { status: 500 }
        );
    }
}