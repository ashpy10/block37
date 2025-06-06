import db from ".db/client.js";
import dotenv from "dotenv";

dotenv.config();

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  try {
    console.log("Starting seed script...");

    await db.query("DELETE FROM files;");
    await db.query("DELETE FROM folders;");
    console.log("Cleared existing data");

    const foldersData = [
      { name: "Documents" },
      { name: "Images" },
      { name: "Projects" }
    ];

    const createdFolders = [];

    for (const folder of foldersData) {
      const result = await db.query(
        "INSERT INTO folders (name) VALUES ($1) RETURNING *;",
        [folder.name]
      );
      createdFolders.push(result.rows[0]);
      console.log(`Created folder: ${folder.name}`);
    }

    const filesData = [
      { name: "resume.pdf", size: 245760, folder_id: createdFolders[0].id },
      { name: "cover_letter.docx", size: 98304, folder_id: createdFolders[0].id },
      { name: "report.txt", size: 15360, folder_id: createdFolders[0].id },
      { name: "notes.md", size: 8192, folder_id: createdFolders[0].id },
      { name: "presentation.pptx", size: 512000, folder_id: createdFolders[0].id },
      
      { name: "vacation.jpg", size: 1048576, folder_id: createdFolders[1].id },
      { name: "profile.png", size: 204800, folder_id: createdFolders[1].id },
      { name: "screenshot.jpeg", size: 307200, folder_id: createdFolders[1].id },
      { name: "logo.svg", size: 4096, folder_id: createdFolders[1].id },
      { name: "banner.gif", size: 153600, folder_id: createdFolders[1].id },
      
      { name: "app.js", size: 12288, folder_id: createdFolders[2].id },
      { name: "package.json", size: 2048, folder_id: createdFolders[2].id },
      { name: "README.md", size: 6144, folder_id: createdFolders[2].id },
      { name: "config.yaml", size: 1024, folder_id: createdFolders[2].id },
      { name: "database.sql", size: 20480, folder_id: createdFolders[2].id }
    ];

    for (const file of filesData) {
      await db.query(
        "INSERT INTO files (name, size, folder_id) VALUES ($1, $2, $3);",
        [file.name, file.size, file.folder_id]
      );
      console.log(`Created file: ${file.name} in folder ID ${file.folder_id}`);
    }

    console.log("Seed completed successfully!");
  } catch (error){
    console.error("Error:", error);
    throw error;
  }
};
