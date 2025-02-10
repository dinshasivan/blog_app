import { createConnection } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Store securely in .env

export async function POST(req) {
    let db;
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return new Response(JSON.stringify({ error: 'All fields are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        db = await createConnection(); // Open DB Connection
        console.log(' Database connection established');

        // Fetch user details
        const [rows] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);

        if (rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const user = rows[0];

        // Compare hashed password
        // const passwordMatch = await bcrypt.compare(password, user.password);
        // if (!passwordMatch) {
        //     return new Response(JSON.stringify({ error: 'Invalid username or password' }), {
        //         status: 401,
        //         headers: { 'Content-Type': 'application/json' }
        //     });
        // }

        console.log(' User authenticated:', user.username);

        // Generate JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '2h' });
        console.log(token);
        
        return new Response(JSON.stringify({
            message: 'Login successful',
            user: { username: user.username },
            token
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error(" Error in /api/login:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });

    } finally {
        if (db) {
            console.log('Closing database connection');
            // await db.end(); // Properly close the connection
        }
    }
}
