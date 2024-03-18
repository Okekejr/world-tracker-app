import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

interface User {
  id: number;
  name: string;
  color: string;
}

async function getUserId(username: string): Promise<number> {
  try {
    const result = await query("SELECT id FROM users WHERE username = $1;", [
      username,
    ]);

    if (result.length > 0) {
      return result[0].id;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error finding user:", error);
    throw new Error("Failed to find user");
  }
}

async function getUserData(userId: number): Promise<User> {
  try {
    const result = await query("SELECT name, color FROM users WHERE id = $1;", [
      userId,
    ]);

    if (result.length > 0) {
      return result[0];
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error finding user data:", error);
    throw new Error("Failed to find user data");
  }
}

async function checkVisited(
  currentUserId: number
): Promise<{ countries: string[]; color: string; name: string }> {
  try {
    const result = await query(
      "SELECT country_code FROM visited_countries WHERE user_id = $1;",
      [currentUserId]
    );
    const countries = result.map((row) => row.country_code);
    const userData = await getUserData(currentUserId);
    const color = userData.color;
    const name = userData.name;

    return { countries, color, name };
  } catch (error) {
    console.error("Error checking visited countries:", error);
    throw new Error("Failed to fetch visited countries");
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { username } = req.query;

    try {
      if (typeof username !== "string") {
        throw new Error("Username should be a string");
      }

      const userId = await getUserId(username);
      const { countries, color, name } = await checkVisited(userId);

      res.status(200).json({ countries, color, name });
    } catch (error) {
      console.error("Error retrieving user data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (req.method === "POST") {
    const { username, country } = req.body;

    try {
      const result = await query(
        "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
        [country]
      );
      const data = result[0];
      const countryCode = data.country_code;
      const userId = await getUserId(username);

      try {
        query(
          "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
          [countryCode, userId]
        );
        console.log("countryCode inserted successfully");
        res.status(200).json({ message: "countryCode inserted successfully" });
      } catch (err) {
        console.log(err);
        res
          .status(500)
          .json({ error: "Error inserting countries", detail: err });
        return;
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Error selecting country_code", detail: error });
      return;
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
