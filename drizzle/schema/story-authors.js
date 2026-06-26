import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { authors } from "./authors.js";

export const storyAuthors = pgTable(
  "story_authors",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    authorId: integer("author_id")
      .notNull()
      .references(() => authors.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.authorId],
    }),

    authorIndex: index("story_authors_author_idx").on(
      table.authorId
    ),
  })
);
