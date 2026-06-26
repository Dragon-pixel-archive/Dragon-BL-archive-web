import db from "../../db.js"
import {eq} from "drizzle-orm"
import { genres } from "../../drizzle/schema/genres.js"
import { storyGenres } from "../../drizzle/schema/story-genres.js"
import { types } from "../../drizzle/schema/types.js"
import { storyTypes } from "../../drizzle/schema/story-types.js"
import { languages } from "../../drizzle/schema/languages.js"
import { storyLanguages } from "../../drizzle/schema/story-languages.js"
import { chapters } from "../../drizzle/schema/chapters.js"
import { characters } from "../../drizzle/schema/characters.js"


export async function getDetails(storyId) {
    const genresData = await db
        .select({
            id: genres.id,
            name: genres.name,
            slug: genres.slug,
            description: genres.description,
            createdAt: genres.createdAt,
            updatedAt: genres.updatedAt
        })
        .from(storyGenres)
        .innerJoin(
            genres,
            eq(storyGenres.genreId,genres.id)
        )
        .where(eq(storyGenres.storyId, storyId));

    const typesData = await db
        .select({
            id: types.id,
            name: types.name,
            slug: types.slug,
            createdAt: types.createdAt,
            updatedAt: types.updatedAt
        })
        .from(storyTypes)
        .innerJoin(
            types,
            eq(storyTypes.typeId, types.id)
        )
        .where(eq(storyTypes.storyId, storyId));

    const languagesData = await db
        .select({
            id: languages.id,
            code: languages.code,
            name: languages.name,
            createdAt: languages.createdAt,
            updatedAt: languages.updatedAt
        })
        .from(storyLanguages)
        .innerJoin(
            languages,
            eq(storyLanguages.languageId, languages.id)
        )
        .where(eq(storyLanguages.storyId, storyId));

    const charactersData = await db
        .select({
            id: characters.id,
            storyId: characters.storyId,
            name: characters.name,
            role: characters.role,
            description: characters.description,
            avatarUrl: characters.avatarUrl,
            createdAt: characters.createdAt,
            updatedAt: characters.updatedAt
        })
        .from(characters)
        .where(eq(characters.storyId, storyId));

    return {
        genres: genresData,
        types: typesData,
        languages: languagesData,
        characters: charactersData
    };
}