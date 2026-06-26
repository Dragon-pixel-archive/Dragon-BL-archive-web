import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { translators } from "./translators.js";

export const storyTranslators = pgTable(
  "story_translators",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    translatorId: integer("translator_id")
      .notNull()
      .references(() => translators.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.translatorId],
    }),

    translatorIndex: index(
      "story_translators_translator_idx"
    ).on(table.translatorId),
  })
);