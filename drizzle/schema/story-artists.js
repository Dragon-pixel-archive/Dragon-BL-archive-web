import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { artists } from "./artists.js";

export const storyArtists = pgTable(
  "story_artists",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.artistId],
    }),

    artistIndex: index("story_artists_artist_idx").on(
      table.artistId
    ),
  })
);