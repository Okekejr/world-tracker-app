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
      const result = await query("SELECT * FROM users WHERE username = $1 ", [
        username,
      ]);

      if (result.length > 0) {
        console.log("User already exists !!!");
        res.status(409).json({ error: "User already exists" });
      } else {
        try {
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
            res
              .status(500)
              .json({ error: "Error inserting user", detail: error });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Error creating users table" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error checking database", detail: error });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
