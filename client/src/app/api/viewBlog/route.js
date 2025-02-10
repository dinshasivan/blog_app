import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";

export async function GET() {
    try {
        const db = await createConnection();
        const [blogs] = await db.execute("SELECT id,username, title, description, media, date FROM blogs ORDER BY date DESC");
        // await db.end();

        return NextResponse.json({ blogs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching blogs:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
