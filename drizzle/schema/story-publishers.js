import {
  pgTable,
  integer,
  primaryKey,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";
import { publishers } from "./publishers.js";

export const storyPublishers = pgTable(
  "story_publishers",
  {
    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    publisherId: integer("publisher_id")
      .notNull()
      .references(() => publishers.id, {
        onDelete: "cascade",
      }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.storyId, table.publisherId],
    }),

    publisherIndex: index(
      "story_publishers_publisher_idx"
    ).on(table.publisherId),
  })
);