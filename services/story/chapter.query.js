import db from "../../db.js"
import { eq } from "drizzle-orm"
import { chapters } from "../../drizzle/schema/chapters.js"

export async function getChapters(storyId) {
    const chaptersData = await db
        .select({
            id: chapters.id,
            storyId: chapters.storyId,
            chapterNumber: chapters.chapterNumber,
            title: chapters.title,
            views: chapters.views,
            createdAt: chapters.createdAt,
            updatedAt: chapters.updatedAt
        })
        .from(chapters)
        .where(eq(chapters.storyId, storyId));

    return chaptersData;
}