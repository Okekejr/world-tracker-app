import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const data = {
  email: "dylanokeks@icloud.com",
  password: "$2b$10$eEOzEm2yygFMZYbu4Lx9qeM7/sivf/65Cpt5uhK53wVlFcVOb.0nC",
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const userEmail = req.body.username;
    const userPassword = req.body.password;

    console.log("Begin", userEmail, userPassword);

    if (userEmail !== data.email) {
      res.status(500).json({ error: "Incorrect Email" });
    } else {
      bcrypt.compare(userPassword, data.password, (err, result) => {
        if (err) {
          console.error("Error comparing passwords:", err);
        } else {
          if (!result) {
            res.status(500).json({ error: "Incorrect Password" });
          } else {
            console.log(result);
            res.status(200).json({ message: "Credentials Match!" });
          }
        }
      });
      console.log("Success", userEmail, userPassword);
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
