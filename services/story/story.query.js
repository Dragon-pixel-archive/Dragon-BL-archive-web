import db from "../../db.js"
import {eq} from "drizzle-orm"
import { stories } from "../../drizzle/schema/stories.js";

export async function getStoryDetail(slug) {
    const storiesData = await db
    .select({
      id: stories.id,
      title: stories.title,
      originalTitle: stories.originalTitle,
      description: stories.description,
      coverUrl: stories.coverUrl,
      bannerUrl: stories.bannerUrl,
      status: stories.status,
      translationStatus: stories.translationStatus,
      ratingAverage: stories.ratingAverage,
      ratingCount: stories.ratingCount,
      views: stories.views,
      follows: stories.follows,
      createdAt: stories.createdAt,
      updatedAt: stories.updatedAt,
    })
    .from(stories)
    .where(eq(stories.slug,slug))
    .limit(1);

    return storiesData[0] ?? null;
}