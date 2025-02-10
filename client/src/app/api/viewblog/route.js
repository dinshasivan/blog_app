import { createConnection } from "@/lib/db";


export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Connect to MySQL Database
    const db = createConnection

    // Fetch user's blogs
    const [blogs] = await db.execute(
      "SELECT * FROM blogs WHERE username = ?",
      [username]
    );

    // Close the connection
    await db.end();

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Database Error:", error);
    return res.status(500).json({ error: "Failed to fetch blogs" });
  }
}
