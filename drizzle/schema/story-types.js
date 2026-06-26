import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { types } from "./types.js";

export const storyTypes = pgTable(
  "story_types",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    typeId: integer("type_id")
      .notNull()
      .references(() => types.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.typeId],
    }),

    typeIndex: index("story_types_type_idx").on(
      table.typeId
    ),
  })
);