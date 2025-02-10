import { NextResponse } from 'next/server';
import { createConnection } from '@/lib/db';

export async function DELETE(req, context) {
    try {
        const { params } = context;
        const id = params?.id;

        if (!id) {
            return NextResponse.json({ success: false, message: "Blog ID is required" }, { status: 400 });
        }

        const db = await createConnection();

        // Check if the blog exists before deleting
        const [existingBlog] = await db.execute("SELECT * FROM blogs WHERE id = ?", [id]);

        if (existingBlog.length === 0) {
            await db.end();
            return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
        }

        // Delete the blog
        const [result] = await db.execute("DELETE FROM blogs WHERE id = ?", [id]);

        await db.end();

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, message: "Failed to delete blog" }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}
