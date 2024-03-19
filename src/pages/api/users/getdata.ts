import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

interface User {
  id: number;
  name: string;
  color: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const username = req.cookies.username;

  try {
    const result = await query("SELECT id FROM users WHERE username = $1;", [
      username,
    ]);

    if (result.length > 0) {
      const userID = result[0].id;

      try {
        const country = await query(
          "SELECT country_code FROM visited_countries WHERE user_id = $1;",
          [userID]
        );

        const countries = country.map((row) => row.country_code);

        try {
          const result = await query(
            "SELECT name, color FROM users WHERE id = $1;",
            [userID]
          );
          if (result.length > 0) {
            const userData = result[0];
            const color = userData.color;
            const userName = userData.name;

            res.status(200).json({ countries, color, userName });
          }
        } catch (error) {
          console.error("Error retrieving username and color:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } catch (error) {
        console.error("Error retrieving countries:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
