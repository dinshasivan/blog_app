import { createConnection } from "@/lib/db"; // Adjust the path based on your database connection file

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { id } = req.query;

    try {
        const db = createConnection()
        const [blog] = await db.query('SELECT * FROM blogs WHERE id = ?', [id]);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
