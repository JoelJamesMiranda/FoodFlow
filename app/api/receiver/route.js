import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
        await db.query(`UPDATE claims JOIN donations ON claims.donation_id = donations.id SET claims.status = 'CANCELLED' WHERE TIMESTAMP(donations.bestBeforeDate, donations.bestBeforeTime) < NOW() AND donations.status = 'CLAIMED' `)

        await db.query(`UPDATE donations SET status = 'EXPIRED' WHERE CONCAT(bestBeforeDate, ' ', bestBeforeTime) < NOW() AND status = 'AVAILABLE' `)

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371; // Earth's radius in km

            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;

            const a =
                Math.sin(dLat / 2) ** 2 +
                Math.cos(lat1 * Math.PI / 180) *
                Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) ** 2;

            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            return R * c;
        }

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

        //Total Donations
        const [stateResult] = await db.query(`SELECT state FROM addresses WHERE userId = ?`, [user_id]);

        const addressPresent = stateResult.length > 0 ? stateResult[0].state : null;

        //Donations Cards
        const [receiverResult] = await db.query(`SELECT latitude, longitude FROM addresses WHERE userId = ?`, [user_id]);

        const receiverLat = receiverResult[0].latitude;
        const receiverLng = receiverResult[0].longitude;

        const [availableDonation] = await db.query(`
           SELECT
    donations.id,
    users.id AS users_id,
    users.name AS donor,
    donations.foodName,
    donations.category,
    donations.quantity,
    donations.bestBeforeDate,
    donations.notes AS notes,
    donations.image,
    addresses.latitude,
    addresses.longitude
FROM users
INNER JOIN donations
    ON users.id = donations.donor_id
INNER JOIN addresses
    ON users.id = addresses.userId
WHERE donations.status = 'AVAILABLE';
            `)

        const [myRequests] = await db.query(`SELECT 
            donations.id,
            users.name AS donorName,
            donations.image, 
            donations.foodName, 
            donations.category,
            donations.quantity,
            donations.unit, 
            claims.distance , 
            claims.created_at AS requestedAt, 
            claims.status,
            claims.receiver_id 
            FROM donations INNER JOIN claims INNER JOIN users 
            WHERE donations.id = claims.donation_id AND donations.donor_id = users.id AND claims.receiver_id = ?` , [user_id])

        const donationsWithDistance = availableDonation.map((donation) => {

            const distance = calculateDistance(
                receiverLat,
                receiverLng,
                donation.latitude,
                donation.longitude
            );

            return {
                ...donation,
                distance
            };
        });

        return Response.json(
            {
                addressPresent: addressPresent,
                availableFood: donationsWithDistance,
                myRequests: myRequests,
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



