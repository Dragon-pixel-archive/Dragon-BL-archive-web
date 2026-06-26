import db from "../../db.js"
import {eq} from "drizzle-orm"
import { publishers } from "../../drizzle/schema/publishers.js"
import { storyPublishers } from "../../drizzle/schema/story-publishers.js"
import { translators } from "../../drizzle/schema/translators.js"
import { storyTranslators } from "../../drizzle/schema/story-translators.js"

export async function getServices(storyId) {
    const publishersData = await db
        .select({
            id: publishers.id,
            name: publishers.name,
            slug: publishers.slug,
            bio: publishers.bio,
            avatarUrl: publishers.avatarUrl,
            website: publishers.website,
            createdAt: publishers.createdAt,
            updatedAt: publishers.updatedAt
        })
        .from(storyPublishers)
        .innerJoin(
            publishers,
            eq(storyPublishers.publisherId, publishers.id)
        )
        .where(eq(storyPublishers.storyId, storyId));
    
    const translatorsData = await db
        .select({
            id: translators.id,
            name: translators.name,
            slug: translators.slug,
            bio: translators.bio,
            avatarUrl: translators.avatarUrl,
            website: translators.website,
            createdAt: translators.createdAt,
            updatedAt: translators.updatedAt
        })
        .from(storyTranslators)
        .innerJoin(
            translators,
            eq(storyTranslators.translatorId, translators.id)
        )
        .where(eq(storyTranslators.storyId, storyId));

    return {
        publishers: publishersData,
        translators: translatorsData
    }
}