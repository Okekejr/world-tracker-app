import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { query } from "../../../../lib/db";
import { truncateEmail } from "@/util/truncateEmail";

const saltRound = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password, color } = req.body;

    try {
      await query(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(25) UNIQUE NOT NULL, password VARCHAR(255), color VARCHAR(15));"
      );

      const hash = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRound, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });

      const name = truncateEmail(username);

      try {
        await query(
          "INSERT INTO users (username, name, password, color) VALUES ($1, $2, $3, $4) RETURNING *",
          [username, name, hash, color]
        );
        console.log("User inserted successfully");
        res.status(200).json({ message: "User inserted successfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error inserting user", detail: error });
      }
    } catch (error) {
      res.status(500).json({ error: "Error creating users table" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
