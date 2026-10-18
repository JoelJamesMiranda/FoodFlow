import db from "@/lib/db";
import { cookies } from "next/headers";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

async function uploadImage(file) {
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "foodflow/donations",
                resource_type: "image",
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("Cloudinary returned no result"));
                    return;
                }

                resolve(result);
            }
        ).end(buffer);
    });
}

export async function POST(request) {
    try {
        const formData = await request.formData();

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

        const image = formData.get("image");
        let imageUrl = null;

        // Validate and upload the image
        if (image && typeof image !== "string" && image.size > 0) {
            const allowedTypes = ["image/jpeg", "image/png"];

            if (!allowedTypes.includes(image.type)) {
                return Response.json(
                    { error: "Only JPG and PNG images are allowed" },
                    { status: 400 }
                );
            }

            if (image.size > 5 * 1024 * 1024) {
                return Response.json(
                    { error: "Image must not exceed 5MB" },
                    { status: 400 }
                );
            }

            const uploadedImage = await uploadImage(image);

            // 4. Save the Cloudinary URL
            imageUrl = uploadedImage.secure_url;
        }


        await db.query(
            `INSERT INTO donations
            (
                donor_id,
                image,
                foodName,
                category,
                quantity,
                unit,
                availableDate,
                availableTime,
                bestBeforeDate,
                bestBeforeTime,
                notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                user_id,
                imageUrl,
                formData.get("foodName"),
                formData.get("category"),
                formData.get("quantity"),
                formData.get("unit"),
                formData.get("availableDate"),
                formData.get("availableTime"),
                formData.get("bestBeforeDate"),
                formData.get("bestBeforeTime"),
                formData.get("notes"),
            ]
        );


        return Response.json({
            success: true,
            message: "Donation details posted successfull!!"
        });
    } catch (error) {
        console.error(error);

        return Response.json(
            { error: "something went wrong" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
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

        const [stats] = await db.query(`
             SELECT
    SUM(CASE WHEN unit = 'Kg' THEN quantity ELSE 0 END) AS Kg,
    SUM(CASE WHEN unit = 'Servings' THEN quantity ELSE 0 END) AS Servings,
    SUM(CASE WHEN unit = 'Packets' THEN quantity ELSE 0 END) AS Packets,
    SUM(CASE WHEN unit = 'Boxes' THEN quantity ELSE 0 END) AS Boxes,
    SUM(CASE WHEN unit = 'Litres' THEN quantity ELSE 0 END) AS Litres
FROM donations
WHERE donor_id = ?
    AND status IN ('AVAILABLE', 'CLAIMED', 'PICKED_UP');  
        `, [user_id])



        //Active donations
        const [activeDonations] = await db.query(`SELECT * FROM donations WHERE donor_id = ? AND status IN('AVAILABLE', 'CLAIMED', 'PICKED_UP') ORDER BY created_at DESC;`, [user_id])

        return Response.json(
            {
                stats: stats[0],
                activeDonations: activeDonations,
                message: "Fetched Donation Data"
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

