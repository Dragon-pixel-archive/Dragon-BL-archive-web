import { count, eq, max, and } from "drizzle-orm";
import db from "../db.js";
import { stories } from "../drizzle/schema/stories.js";
import { chapters } from "../drizzle/schema/chapters.js";
import { chapterImages } from "../drizzle/schema/chapter-images.js";

export async function getChapter(storySlug, chapterNumber) {
    const storyData = await db
        .select({
            id: stories.id,
            title: stories.title,
            slug: stories.slug
        })
        .from(stories)
        .where(eq(stories.slug, storySlug))
        .limit(1);

    if (!storyData.length) return null;

    const story = storyData[0];

    const [{ chapCount, lastedChapter }] = await db
        .select({
            chapCount: count(),
            lastedChapter: max(chapters.chapterNumber)
        })
        .from(chapters)
        .where(eq(chapters.storyId, story.id));

    const chapterData = await db
        .select()
        .from(chapters)
        .where(
            and(
                eq(chapters.storyId, story.id),
                eq(chapters.chapterNumber, chapterNumber)
            )
        )
        .limit(1);

    const chapter = chapterData[0];
    if (!chapter) return null;


    const images = await db
        .select({
            id: chapterImages.id,
            imageUrl: chapterImages.imageUrl,
            imageOrder: chapterImages.imageOrder
        })
        .from(chapterImages)
        .where(eq(chapterImages.chapterId, chapter.id))
        .orderBy(chapterImages.imageOrder);

    const maxChapter = lastedChapter ?? 0;

    const chapterPre = chapterNumber > 1 ? (+chapterNumber) - 1 : null;
    const chapterNext = chapterNumber < maxChapter ? (+chapterNumber) + 1 : null;

    return {
        story,
        chapter,
        images,
        navigation: {
            chapterPre,
            chapterNext,
            chapterNumber,
            chapCount
        },
    };

}