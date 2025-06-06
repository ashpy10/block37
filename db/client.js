import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const db = new pg.Client(process.env.DATABASE_URL);

db.connect()
  .then(() => {
    console.log("🟢 Connected to Postgres via DATABASE_URL");
  })
  .catch((err) => {
    console.error("🔴 Postgres connection error:", err);
  });


export default db;
