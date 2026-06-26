import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { languages } from "./languages.js";

export const storyLanguages = pgTable(
  "story_languages",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    languageId: integer("language_id")
      .notNull()
      .references(() => languages.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.languageId],
    }),

    languageIndex: index("story_languages_lang_idx").on(
      table.languageId
    ),
  })
);