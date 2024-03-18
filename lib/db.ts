import { db } from "@vercel/postgres";

export const query = async (text: string, params: any[] = []) => {
  const client = await db.connect();
  try {
    const result = await client.query(text, params);
    return result.rows;
  } finally {
    client.release();
  }
};
