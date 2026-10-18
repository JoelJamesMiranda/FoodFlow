
import db from "@/lib/db";
import { cookies } from "next/headers";

export async function GET() {
    try {
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

        const [volunteerLocations] = await db.query(`
            SELECT
                latitude,
                longitude,
                recorded_at
            FROM volunteer_locations
            WHERE volunteer_id = ?
            `, [user_id]);

        const volunteerLocation = volunteerLocations.length > 0
            ? volunteerLocations[0]
            : null;

        const [rows] = await db.query(`SELECT
            deliveries.id,
            deliveries.volunteer_id,
            deliveries.status As status,

            donations.foodName,
            donations.image,
            donations.category,
            donations.quantity,
            donations.unit,
            donations.id AS donation_id,

            claims.id as claim_id,

            donor.name AS donorName,
            CONCAT_WS(', ', donorAdd.street, donorAdd.city) AS donorAddress,

            receiver.name AS receiverName,
            CONCAT_WS(', ', receiverAdd.street, receiverAdd.city) AS receiverAddress

            FROM
                deliveries
                    INNER JOIN claims
                        ON deliveries.claim_id = claims.id
                    INNER JOIN donations
                        ON claims.donation_id = donations.id
                    INNER JOIN users AS donor
                        ON donations.donor_id = donor.id
                    INNER JOIN users AS receiver
                        ON claims.receiver_id = receiver.id
                    INNER JOIN addresses AS donorAdd
                        ON donations.donor_id = donorAdd.userId
                    INNER JOIN addresses AS receiverAdd
                        ON claims.receiver_id = receiverAdd.userId

                    WHERE deliveries.volunteer_id = ?
                    AND deliveries.status IN ('CLAIMED', 'PICKED_UP','ON_THE_WAY')`, [user_id])

        let activeDelivery = true;

        if (rows.length === 0) {
            activeDelivery = false;
        }

        const [availableDeliveries] = await db.query(`

            SELECT
                donations.id AS donation_id,
                claims.id AS claim_id,

                donations.donor_id,
                donor.name AS donorName,

                claims.receiver_id,
                receiver.name AS receiverName,

                donations.bestBeforeDate,
                donations.bestBeforeTime,
                donations.image,
                donations.foodName,
                donations.category,
                donations.unit,
                donations.quantity,

                donorAdd.latitude AS donorLatitude,
                donorAdd.longitude AS donorLongitude,

                receiverAdd.latitude AS receiverLatitude,
                receiverAdd.longitude AS receiverLongitude

                FROM donations

                    INNER JOIN claims
                        ON donations.id = claims.donation_id
                        AND claims.status = 'PENDING'

                    INNER JOIN users AS donor
                        ON donations.donor_id = donor.id

                    INNER JOIN users AS receiver
                        ON claims.receiver_id = receiver.id

                    INNER JOIN addresses AS donorAdd
                        ON donations.donor_id = donorAdd.userId

                    INNER JOIN addresses AS receiverAdd
                        ON claims.receiver_id = receiverAdd.userId
        `);

        const deliveriesWithDistance = availableDeliveries.map((delivery) => {
            const donorToReceiverDistance = calculateDistance(
                Number(delivery.donorLatitude),
                Number(delivery.donorLongitude),
                Number(delivery.receiverLatitude),
                Number(delivery.receiverLongitude)
            );

            let volunteerToDonorDistance = null;

            if (volunteerLocation) {
                volunteerToDonorDistance = calculateDistance(
                    Number(volunteerLocation.latitude),
                    Number(volunteerLocation.longitude),
                    Number(delivery.donorLatitude),
                    Number(delivery.donorLongitude)
                );
            }

            return {
                ...delivery,

                donorToReceiverDistance:
                    Number(donorToReceiverDistance.toFixed(2)),

                volunteerToDonorDistance:
                    volunteerToDonorDistance !== null
                        ? Number(volunteerToDonorDistance.toFixed(2))
                        : null
            };
        });

        const [deliveryHistory] = await db.query(`SELECT
        donations.id,
            deliveries.volunteer_id,
            deliveries.status,
            deliveries.created_at,
            receiver.name AS receiverName,
            donor.name AS donorName,
            donations.image,
            donations.foodName,
            donations.category,
            donations.quantity,
            donations.unit
        FROM
        deliveries
    INNER JOIN donations
        ON deliveries.donation_id = donations.id
    INNER JOIN claims
        ON deliveries.claim_id = claims.id
    INNER JOIN users AS donor
        ON donations.donor_id = donor.id
    INNER JOIN users AS receiver
        ON claims.receiver_id = receiver.id
    WHERE deliveries.volunteer_id = ? ORDER BY deliveries.created_at DESC;` ,[user_id])



        return Response.json(
            {
                availableDeliveries: deliveriesWithDistance,
                ActiveDelivery: rows.length > 0,
                currentDeliveryDetials: rows[0],
                deliveryHistory,
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

export async function PATCH(request) {
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

        console.log("Mark as picked_up : ", body)

        const user_id = userid[0].user_id;

        await db.query(`UPDATE deliveries SET status = ? WHERE id = ? AND volunteer_id = ?`, [body.status, body.deliveryId, user_id]);

        await db.query(`UPDATE claims SET status = ? WHERE id = ?`, [body.status, body.claim_id])

        await db.query(`UPDATE donations SET status = ? WHERE id = ?`, [body.status, body.donation_id])

        return Response.json({
            success: true,
            message: "Update successfull!!"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}