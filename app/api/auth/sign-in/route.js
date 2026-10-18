import db from "@/lib/db";
import bycrypt from 'bcrypt'
import { cookies } from "next/headers";
import crypto from 'crypto';

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.name == "" || body.email == "" || body.password == "") {
      return Response.json(
        { error: "Enter valid details" },
        { status: 403 }
      );
    }

    const [existing] = await db.query("SELECT * FROM users WHERE email = ? ", [body.email])

    if (existing.length !== 0) {
      return Response.json(
        { error: "Email already exists" },
        { status: 403 }
      );
    }

    const bycryptPass = await bycrypt.hash(body.password, 10);
    const [rows] = await db.query("INSERT INTO users (name, email, password) VALUES (?, ? , ? )", [body.name, body.email, bycryptPass])

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

    await db.query("INSERT INTO sessions (user_id, session_token, expires_at) VALUES ( ? , ? , ? )", [rows.insertId, token, expiresAt])

    return Response.json({
      success: true,
      message: "Sign-in Successfull"
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}