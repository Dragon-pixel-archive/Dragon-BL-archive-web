import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";

export const chapters = pgTable(
  "chapters",
  {
    id: serial("id").primaryKey(),

    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    chapterNumber: integer("chapter_number").notNull(),

    title: varchar("title", {
      length: 255,
    }).notNull(),

    views: integer("views")
      .notNull()
      .default(0),

    createdAt: timestamp("created_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),

    updatedAt: timestamp("updated_at", {
      withTimezone: true,
    })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    // 1 story không được có 2 chapter trùng number
    storyChapterUnique: uniqueIndex(
      "chapters_story_chapter_unique"
    ).on(table.storyId, table.chapterNumber),

    storyIndex: index("chapters_story_idx").on(
      table.storyId
    ),

    chapterNumberIndex: index(
      "chapters_number_idx"
    ).on(table.chapterNumber),

    storyNumberIndex: index(
      "chapters_story_number_idx"
    ).on(table.storyId, table.chapterNumber),
  })
);