import { Pool } from "pg";

const database = new Pool({
  user: "postgres",
  host: "localhost",
  database: "worldTracker",
  password: "Corona8965",
  port: 5432,
});

export const query = async (text: string, params: any[] = []) => {
  const client = await database.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};
