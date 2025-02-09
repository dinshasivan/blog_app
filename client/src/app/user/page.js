import { NextResponse } from "next/server";
import { createConnection } from "@/lib/db";
import formidable from "formidable";
import fs from "fs/promises"; // Use fs.promises for async operations
import path from "path";

// Disable Next.js body parsing (important for file uploads)
export const config = {
  api: { bodyParser: false },
};

const UserPage =async (req,res)=>{

  try {
    // Convert `req` to a compatible format for formidable
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), "public/uploads"); // Absolute path
    form.keepExtensions = true;

    // Ensure the upload directory exists
    await fs.mkdir(form.uploadDir, { recursive: true });

    // Parse the form data
    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve([fields, files]);
      });
    });

    // Extract form fields
    const { userId, title, description, date } = fields;
    let mediaUrl = null;

    // Handle file upload
    if (files.media) {
      const file = files.media[0];
      const ext = path.extname(file.originalFilename).toLowerCase();
      
      if (![".jpg", ".jpeg", ".png", ".gif"].includes(ext)) {
        return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
      }

      // Generate a new unique filename
      const newFileName = `${Date.now()}_${file.originalFilename}`;
      const newFilePath = path.join(form.uploadDir, newFileName);

      // Move the file asynchronously
      await fs.rename(file.filepath, newFilePath);

      // Set media URL for database storage
      mediaUrl = `/uploads/${newFileName}`;
    }

    // Connect to MySQL and insert data
    const db = await createConnection();
    const query = "INSERT INTO blogs (user_id, title, description, media_url, date) VALUES (?, ?, ?, ?, ?)";
    const values = [userId, title, description, mediaUrl, date];

    await db.execute(query, values);
    await db.end();

    return NextResponse.json({ message: "Blog added successfully!" }, { status: 201 });

  } catch (error) {
    console.error("Error adding blog:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
