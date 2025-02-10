import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';

export async function PUT(req, context) {
    try {
        const { params } = context;
        const id = params?.id;
        console.log(id);
        
        if (!id) {
            return NextResponse.json({ success: false, message: "Blog ID is required" }, { status: 400 });
        }

        const { title, description, media } = await req.json();

        if (!title || !description) {
            return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
        }

        const db = await createConnection();

        // Check if the blog exists before updating
        const [existingBlog] = await db.execute("SELECT media FROM blogs WHERE id = ?", [id]);

        if (existingBlog.length === 0) {
            // await db.end();
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        // If media is not provided, keep the existing media URL
        const updatedMedia = media !== undefined && media !== "" ? media : existingBlog[0].media_url;

        // Execute update query
        const [result] = await db.execute(
            "UPDATE blogs SET title = ?, description = ?, media = ? WHERE id = ?",
            [title, description, updatedMedia, id]
        );

        await db.end();

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, message: "No changes made" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Blog updated successfully", updatedMedia });
    } catch (error) {
        console.error("Edit Error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
