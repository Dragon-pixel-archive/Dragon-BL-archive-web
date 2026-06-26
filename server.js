import express from "express";
import multer from "multer";
import { put } from "@vercel/blob";
import { chapterImages } from "./drizzle/schema/chapter-images.js";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js";
import { stories, chapters } from "./drizzle/schema/index.js";
import { eq, count, max } from "drizzle-orm";
import storyRoutes from "./routes/story.routes.js";
import readRoutes from "./routes/read.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static("public"));

const upload = multer({ storage: multer.memoryStorage() });

// Trang chủ
app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "./views/index.html")
    );

});

app.use("/stories", storyRoutes);
app.use("/read", readRoutes)

//trang chủ thông tin truyện
app.get("/stories", async (req, res) => {
    try {
        const data = await db
            .select({
                id: stories.id,
                title: stories.title,
                coverUrl: stories.coverUrl,
                status: stories.status,
                createdAt: stories.createdAt,
                slug: stories.slug,

                views: stories.views,
                rating: stories.ratingAverage,

                chapCount: count(chapters.id),
                latestChapter: max(chapters.chapterNumber),
            })
            .from(stories)
            .leftJoin(chapters, eq(stories.id, chapters.storyId))
            .groupBy(
                stories.id,
                stories.title,
                stories.coverUrl,
                stories.status,
                stories.createdAt,
                stories.views,
                stories.ratingAverage
            );

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
});

app.get("/admin/upload", (req, res) => {
    res.sendFile(
        path.join(__dirname, "public/upload.html")
    );
});

app.post("/api/upload-chapter", upload.array("images"), async (req, res) => {
    try {
        const { storyId, chapterNumber, ChapterId } = req.body;
        const files = req.files;

        const results = [];

        let index = 0;

        for (const file of files) {
            // 📤 upload blob
            const blob = await put(
                `stories/${storyId}/chapter-${chapterNumber}/${file.originalname}`,
                file.buffer,
                { access: "public" }
            );

            // 💾 lưu DB
            await db.insert(chapterImages).values({
                chapterId: Number(ChapterId),
                imageUrl: blob.url,        
                imageOrder: index          
            });

            results.push(blob.url);
            index++;
        }

        res.json({
            success: true,
            uploaded: results.length,
            urls: results
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
});


app.listen(PORT, () => {

    console.log(
        `Server đang chạy tại:
        http://localhost:${PORT}`
    );

});