import db from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const cookieStore = await cookies();
        const session_token = cookieStore.get("session_token")?.value

        if(!session_token){
             return Response.json({
            error: "no logged users"
        });
        }

        await db.query("DELETE FROM sessions WHERE session_token = ? ", [session_token])

        cookieStore.delete("session_token");

        return Response.json({
            success: true,
            message: "logout Successfull"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}