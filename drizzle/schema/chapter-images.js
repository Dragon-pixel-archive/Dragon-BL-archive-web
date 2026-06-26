import {
  pgTable,
  serial,
  integer,
  text,
  index,
} from "drizzle-orm/pg-core";

import { chapters } from "./chapters.js";

export const chapterImages = pgTable(
  "chapter_images",
  {
    id: serial("id").primaryKey(),

    chapterId: integer("chapter_id")
      .notNull()
      .references(() => chapters.id, {
        onDelete: "cascade",
      }),

    imageUrl: text("image_url").notNull(),

    imageOrder: integer("image_order").notNull(),
  },
  (table) => ({
    chapterIndex: index("chapter_images_chapter_idx").on(
      table.chapterId
    ),

    chapterOrderIndex: index(
      "chapter_images_chapter_order_idx"
    ).on(table.chapterId, table.imageOrder),
  })
);