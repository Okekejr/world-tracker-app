import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { query } from "../../../../lib/db";
import { truncateEmail } from "@/util/truncateEmail";
import fs from "fs";

const saltRound = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password, color } = req.body;

    try {
      // Create the users table
      await query(
        "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, name VARCHAR(25) UNIQUE NOT NULL, password VARCHAR(255), color VARCHAR(15));"
      );

      // Create the visited_countries table
      await query(
        "CREATE TABLE IF NOT EXISTS visited_countries (id SERIAL PRIMARY KEY, country_code CHAR(2) NOT NULL, user_id INTEGER REFERENCES users(id));"
      );

      // Create the countries table
      await query(
        "CREATE TABLE IF NOT EXISTS countries (id SERIAL PRIMARY KEY, country_code CHAR(2), country_name VARCHAR(100));"
      );

      // Check if the countries table is empty
      const countriesCheck = await query("SELECT COUNT(*) FROM countries");

      if (countriesCheck[0].count === "0") {
        // Read and parse the CSV file
        const countriesData = fs
          .readFileSync("public/countries.csv", "utf-8")
          .split("\n")
          .slice(1) // Skip header
          .map((line) => {
            const [id, country_code, country_name] = line.split(",");
            return [country_code, country_name];
          });

        try {
          // Insert data into the countries table
          const placeholders = countriesData
            .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
            .join(", ");
          await query(
            `INSERT INTO countries (country_code, country_name) VALUES ${placeholders}`,
            countriesData.flat() // Flatten the array of arrays
          );
          console.log("Countries inserted successfully");
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: "Error inserting countries", detail: error });
          return;
        }
      } else {
        console.log(
          "Countries table already contains data, skipping insertion"
        );
      }

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
