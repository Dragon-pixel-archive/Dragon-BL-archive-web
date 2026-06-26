import { relations } from "drizzle-orm";

// tables
import { users } from "./users.js";
import { stories } from "./stories.js";
import { chapters } from "./chapters.js";
import { chapterImages } from "./chapter-images.js";

import { authors } from "./authors.js";
import { artists } from "./artists.js";
import { publishers } from "./publishers.js";
import { translators } from "./translators.js";

import { genres } from "./genres.js";
import { types } from "./types.js";
import { languages } from "./languages.js";

// junctions
import { storyAuthors } from "./story-authors.js";
import { storyArtists } from "./story-artists.js";
import { storyPublishers } from "./story-publishers.js";
import { storyTranslators } from "./story-translators.js";

import { storyGenres } from "./story-genres.js";
import { storyTypes } from "./story-types.js";
import { storyLanguages } from "./story-languages.js";

export const usersRelations = relations(users, ({ many }) => ({
  bookmarks: many(), // (nếu sau này bạn add bookmarks relations)
  ratings: many(),
  readingHistory: many(),
}));

export const storiesRelations = relations(stories, ({ one, many }) => ({
  chapters: many(chapters),

  storyAuthors: many(storyAuthors),
  storyArtists: many(storyArtists),
  storyPublishers: many(storyPublishers),
  storyTranslators: many(storyTranslators),

  storyGenres: many(storyGenres),
  storyTypes: many(storyTypes),
  storyLanguages: many(storyLanguages),
}));

export const chaptersRelations = relations(chapters, ({ one, many }) => ({
  story: one(stories, {
    fields: [chapters.storyId],
    references: [stories.id],
  }),

  images: many(chapterImages),
}));

export const chapterImagesRelations = relations(
  chapterImages,
  ({ one }) => ({
    chapter: one(chapters, {
      fields: [chapterImages.chapterId],
      references: [chapters.id],
    }),
  })
);

export const authorsRelations = relations(authors, ({ many }) => ({
  storyAuthors: many(storyAuthors),
}));

export const artistsRelations = relations(artists, ({ many }) => ({
  storyArtists: many(storyArtists),
}));

export const publishersRelations = relations(
  publishers,
  ({ many }) => ({
    storyPublishers: many(storyPublishers),
  })
);

export const translatorsRelations = relations(
  translators,
  ({ many }) => ({
    storyTranslators: many(storyTranslators),
  })
);

export const genresRelations = relations(genres, ({ many }) => ({
  storyGenres: many(storyGenres),
}));

export const typesRelations = relations(types, ({ many }) => ({
  storyTypes: many(storyTypes),
}));

export const languagesRelations = relations(
  languages,
  ({ many }) => ({
    storyLanguages: many(storyLanguages),
  })
);

export const storyAuthorsRelations = relations(
  storyAuthors,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyAuthors.storyId],
      references: [stories.id],
    }),

    author: one(authors, {
      fields: [storyAuthors.authorId],
      references: [authors.id],
    }),
  })
);

export const storyArtistsRelations = relations(
  storyArtists,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyArtists.storyId],
      references: [stories.id],
    }),

    artist: one(artists, {
      fields: [storyArtists.artistId],
      references: [artists.id],
    }),
  })
);

export const storyPublishersRelations = relations(
  storyPublishers,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyPublishers.storyId],
      references: [stories.id],
    }),

    publisher: one(publishers, {
      fields: [storyPublishers.publisherId],
      references: [publishers.id],
    }),
  })
);

export const storyTranslatorsRelations = relations(
  storyTranslators,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyTranslators.storyId],
      references: [stories.id],
    }),

    translator: one(translators, {
      fields: [storyTranslators.translatorId],
      references: [translators.id],
    }),
  })
);

export const storyGenresRelations = relations(
  storyGenres,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyGenres.storyId],
      references: [stories.id],
    }),

    genre: one(genres, {
      fields: [storyGenres.genreId],
      references: [genres.id],
    }),
  })
);

export const storyTypesRelations = relations(
  storyTypes,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyTypes.storyId],
      references: [stories.id],
    }),

    type: one(types, {
      fields: [storyTypes.typeId],
      references: [types.id],
    }),
  })
);

export const storyLanguagesRelations = relations(
  storyLanguages,
  ({ one }) => ({
    story: one(stories, {
      fields: [storyLanguages.storyId],
      references: [stories.id],
    }),

    language: one(languages, {
      fields: [storyLanguages.languageId],
      references: [languages.id],
    }),
  })
);