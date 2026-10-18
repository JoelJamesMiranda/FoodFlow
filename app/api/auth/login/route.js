import db from "@/lib/db";
import crypto from "crypto";
import { cookies } from "next/headers";
import bcrypt from 'bcrypt';

export async function POST(request) {
    try {
        const body = await request.json();

        if (body.email == "" || body.password == "") {
            return Response.json(
                { error: "Enter valid details" },
                { status: 403 }
            );
        }


        const [rows] = await db.query("SELECT * FROM users WHERE email =  ? ", [body.email])

        if (rows.length === 0) {
            return Response.json(
                { error: "invalid email or password" },
                { status: 401 }
            );
        }
        const user = rows[0]
        const isValid = await bcrypt.compare(
            body.password,
            user.password
        );

        if (!isValid) {
            return Response.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        const cookieStore = await cookies();

        cookieStore.set("session_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires: expiresAt,
            path: "/"
        });

        await db.query("INSERT INTO sessions (user_id, session_token, expires_at) VALUES ( ? , ? , ? )", [user.id, token, expiresAt])


        return Response.json({
            success: true,
            message: "login Successfull"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}