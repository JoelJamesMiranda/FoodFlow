import db from "@/lib/db";

export async function GET() {
  try {
    const [data] = await db.query("SELECT * FROM users");

    return Response.json({
      success: true,
      data: data,
    });
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