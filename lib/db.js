import mysql from "mysql2/promise";
import fs from "node:fs";
import path from "node:path";

const useSSL = process.env.DB_SSL === "true";

const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

if (useSSL) {
    const ca = process.env.DB_CA_CERT
        ? process.env.DB_CA_CERT.replace(/\\n/g, "\n")
        : fs.readFileSync(
              path.join(process.cwd(), "ca.pem"),
              "utf8"
          );

    config.ssl = {
        ca,
        rejectUnauthorized: true,
    };
}

const pool = mysql.createPool(config);

export default pool;