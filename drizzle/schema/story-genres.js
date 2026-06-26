import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { genres } from "./genres.js";

export const storyGenres = pgTable(
  "story_genres",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    genreId: integer("genre_id")
      .notNull()
      .references(() => genres.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.genreId],
    }),

    genreIndex: index("story_genres_genre_idx").on(
      table.genreId
    ),
  })
);