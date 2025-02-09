import { createConnection } from "@/lib/db"; // MySQL connection file

export default async function handler(req, res) {
    let db; 
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    try {
        const { userId, title, description, media, date } = req.body;

        if (!userId || !title || !description || !date) {
        return res.status(400).json({ message: "All fields are required" });
        }
        db = createConnection()
        // Save blog to database
        const query = "INSERT INTO blogs (user_id, title, description, media_url, date) VALUES (?, ?, ?, ?, ?)";
        const values = [userId, title, description, media || null, date];

        await db.execute(query, values);
        return res.status(201).json({ message: "Blog added successfully!" });

    } catch (error) {
        console.error("Error adding blog:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}
