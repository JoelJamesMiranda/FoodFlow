
import mysql from "mysql2/promise";

const useSSL = process.env.DB_SSL === "true";

const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

if (useSSL) {
    config.ssl = {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true,
    };
}

const pool = mysql.createPool(config);

export default pool;
