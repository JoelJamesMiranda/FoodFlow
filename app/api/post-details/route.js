import db from "@/lib/db";
import { cookies } from "next/headers";

export async function PATCH(request) {
    try {
        const body = await request.json();

        //getting token
        const cookieStore = await cookies();
        const token = cookieStore.get("session_token")?.value
        
        if (!token) {
            return Response.json(
                { error: "no logged users" },
                { status: 404 }
            )
        }
        

        // Getting user_id
        const [userid] = await db.query(
            `SELECT user_id FROM sessions WHERE session_token = ?`,
            [token]
        );

        if (userid.length === 0) {
            return Response.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }

        const userId = userid[0].user_id;

        //Create Full Address
        const fullAddress = [
            body.houseNumber,
            body.street,
            body.area,
            body.city,
            body.state,
            body.pincode,
            "India"
        ]
            .filter(Boolean)
            .join(", ");

        //GeoCoding
        const mapboxURL =
            `https://api.mapbox.com/search/geocode/v6/forward` +
            `?q=${encodeURIComponent(fullAddress)}` +
            `&country=in` +
            `&limit=1` +
            `&autocomplete=false` +
            `&access_token=${process.env.MAPBOX_ACCESS_TOKEN}`;

        const geoResponse = await fetch(mapboxURL);

        if (!geoResponse.ok) {
            throw new Error("Geocoding request failed");
        }

        const geoData = await geoResponse.json();

        if (!geoData.features || geoData.features.length === 0) {
            return Response.json(
                {
                    error: "Could not find this address. Please check your address details."
                },
                { status: 400 }
            );
        }

        const [longitude, latitude] =
            geoData.features[0].geometry.coordinates;

        const [rows] = await db.query("SELECT * FROM addresses WHERE userId = ? ", [userId])

        if(rows.length === 0){
            await db.query(`INSERT INTO addresses (userId, houseNumber, street, area, city, state, pincode, landmark, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ? ,?) `, [
                userId, body.houseNumber, body.street, body.area, body.city, body.state, body.pincode, body.landmark, latitude, longitude
            ])
            return Response.json({
            success: true,
            message: "Update successfull!!"
        });
        }
        
        //update ADDRESSES TABLE
        await db.query(`UPDATE addresses SET houseNumber = ?, street = ? , area = ? , city = ? , state = ? , pincode = ? , landmark = ?, latitude = ?, longitude = ? WHERE userId = ?` , [body.houseNumber, body.street, body.area, body.city, body.state, body.pincode, body.landmark, latitude, longitude,userId])

        //update USERS TABLE
        var gender = body.gender ;
        if(body.gender === ""){
            gender = null
        }
        await db.query(`UPDATE users SET name = ?, gender = ? WHERE id = ?`, [body.name, gender, userId])

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