import db  from "../../db.js";
import { eq } from "drizzle-orm";
import { artists } from "../../drizzle/schema/artists.js";
import { storyArtists } from "../../drizzle/schema/story-artists.js";
import { authors } from "../../drizzle/schema/authors.js";
import { storyAuthors } from "../../drizzle/schema/story-authors.js";

export async function getCreators(storyId) {
    const artistData = await db
        .select({
            id: artists.id,
            name: artists.name,
            slug: artists.slug,
            bio: artists.bio,
            avatarUrl: artists.avatarUrl,
            website: artists.website,
            createdAt: artists.createdAt,
            updatedAt: artists.updatedAt
        })
        .from(storyArtists)
        .innerJoin(
            artists,
            eq(storyArtists.artistId, artists.id)
        )
        .where(eq(storyArtists.storyId,storyId));

    const authorData = await db
        .select({
            id: authors.id,
            name: authors.name,
            slug: authors.slug,
            bio: authors.bio,
            avatarUrl: authors.avatarUrl,
            website: authors.website,
            createdAt: authors.createdAt,
            updatedAt: authors.createdAt
        })
        .from(storyAuthors)
        .innerJoin(
            authors,
            eq(storyAuthors.authorId, authors.id)
        )
        .where(eq(storyAuthors.storyId, storyId));

    return {
        artists: artistData,
        authors: authorData
    };
}