import { NextApiRequest, NextApiResponse } from "next";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { country, username } = req.body;

    try {
      const result = await query(
        "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
        [country]
      );

      const data = result[0];
      const countryCode = data.country_code;

      try {
        const user = await query("SELECT id FROM users WHERE username = $1;", [
          username,
        ]);

        if (user.length > 0) {
          const userID = user[0].id;

          try {
            await query(
              "INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)",
              [countryCode, userID]
            );
            console.log("countryCode inserted successfully");
            res
              .status(200)
              .json({ message: "countryCode inserted successfully" });
          } catch (error) {
            console.log(error);
            res
              .status(500)
              .json({ error: "Error inserting countries", detail: error });
          }
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error getting userID", detail: error });
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
