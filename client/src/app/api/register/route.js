import { createConnection } from '@/lib/db';

export async function POST(req) {
    try {
        const { fullname, username, password } = await req.json()

        console.log(req.body);
        

        if (!fullname || !username || !password) {
            return Response.json({ error: 'All fields are required' }, { status: 400 });
        }

        const db = await createConnection();
        const [existingUser] = await db.execute('SELECT * FROM user WHERE username = ?', [username]);

        if (existingUser.length > 0) {
            return Response.json({ error: 'Username already exists' }, { status: 409 });
        }

        await db.execute('INSERT INTO user (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, password]);

        return Response.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
