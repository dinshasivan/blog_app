import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import fs from "fs/promises";
import path from "path";

// Disable body parser
export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Read form data
    const formData = await req.formData();

    // Extract fields
    const username = formData.get("username")?.trim(); // ✅ Changed from userId to username
    const title = formData.get("title")?.trim();
    const description = formData.get("description")?.trim();
    const date = formData.get("date")?.trim();
    const file = formData.get("media");

    // 🛑 Debugging: Log extracted values
    console.log("Extracted Data:", { username, title, description, date, file });

    // Validate required fields
    if (!username || !title || !description || !date) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    let mediaUrl = null;

    // Handle file upload
    if (file && file.name) {
      const ext = path.extname(file.name).toLowerCase();
      if (![".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
        return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
      }

      // Generate unique filename
      const newFileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(uploadDir, newFileName);
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      await fs.writeFile(filePath, fileBuffer);

      // Set media URL
      mediaUrl = `/uploads/${newFileName}`;
    }

    // Insert into MySQL
    const db = await createConnection();
    const query = "INSERT INTO blogs (username, title, description, media, date) VALUES (?, ?, ?, ?, ?)";
    const values = [username, title, description, mediaUrl, date];

    console.log("Executing Query:", query, values); //  Debugging

    await db.execute(query, values);
    // await db.end();

    return NextResponse.json({ message: "Blog added successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
