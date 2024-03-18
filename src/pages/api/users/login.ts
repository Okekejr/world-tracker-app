import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { query } from "../../../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      const result = await query("SELECT * FROM users WHERE username = $1 ", [
        username,
      ]);

      if (result.length > 0) {
        const user = result[0];
        const storedHashedPassword = user.password;
        const storedUsername = user.username;

        if (username !== storedUsername) {
          res.status(500).json({ error: "Incorrect Email" });
        } else {
          bcrypt.compare(password, storedHashedPassword, (err, result) => {
            if (err) {
              console.error("Error comparing passwords:", err);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              if (!result) {
                console.log("Passwords do not match");
                res.status(500).json({ error: "Incorrect Password" });
              } else {
                console.log(result);
                console.log("Success");
                res.status(200).json({ message: "Credentials Match!" });
              }
            }
          });
        }
      } else {
        res.status(404).json({ error: "User Not Found!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error confirming credentials" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
