import { createConnection } from '@/lib/db';

export async function POST(req) {
    try {
        const { fullname, username, password } = await req.json();

        if (!fullname || !username || !password) {
            return Response.json({ error: 'All fields are required' }, { status: 400 });
        }

        const db = await createConnection();

        // Create database if not exists
        // await db.execute(`CREATE DATABASE IF NOT EXISTS Tasty-tales`);
        // await db.execute(`USE Tasty-tales`);

        // Create table if not exists
        await db.execute(`
            CREATE TABLE IF NOT EXISTS user (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fullname VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Check if the username already exists
        const [existingUser] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return Response.json({ error: 'Username already exists' }, { status: 409 });
        }

        // Insert the new user
        await db.execute('INSERT INTO user (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, password]);

        return Response.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
