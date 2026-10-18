import db from "@/lib/db";
import { cookies } from "next/headers";

export async function POST(request) {
    try {
        const body = await request.json();

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

        const user_id = userid[0].user_id;

        const [CurrDel] = await db.query(`SELECT * FROM deliveries WHERE volunteer_id = ? AND status NOT IN ('CANCELLED', 'DELIVERED')`, [user_id])

        if(CurrDel.length !== 0){
             return Response.json(
                { message: "You can only do ONE delivery at a time" }
            );
        }

        const [row] = await db.query(`select status from claims where id = ?`, [body.claim_id])

        if(row[0].status !== "PENDING"){
            return Response.json(
                { error: "Volunteer already assigned to this order" },
                { status: 403 }
            );
        }

        console.log(body)
        
        await db.query(`UPDATE claims SET status = 'VOLUNTEER_ASSIGNED' WHERE id = ? `, [body.claim_id])

        await db.query(`UPDATE donations SET status = 'CLAIMED' WHERE id = ? `, [body.donation_id])

        const [rows] = await db.query(`SELECT 
            donations.id,
            claims.receiver_id,
            donations.donor_id,

            donor.latitude AS donLat,
            donor.longitude AS donLong,

            receiver.latitude AS recLat,
            receiver.longitude AS recLong

            FROM claims
            INNER JOIN donations ON 
            claims.donation_id = donations.id

            INNER JOIN addresses AS donor ON
            donations.donor_id = donor.userId

            INNER JOIN addresses AS receiver ON
            claims.receiver_id = receiver.userId WHERE donations.id = ?`, [body.donation_id])

        await db.query("INSERT INTO deliveries (claim_id, volunteer_id, donation_id, donorLat, donorLong, recLat, recLong ) VALUES(? ,? ,?, ?, ? ,? ,?) ", [
                body.claim_id, user_id, body.donation_id, rows[0].donLat, rows[0].donLong, rows[0].recLat, rows[0].recLong
            ])

        return Response.json({
                success: true,
                message: "Delivery Accepted!!!"
            });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}