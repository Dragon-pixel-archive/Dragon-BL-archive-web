import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const genres = pgTable(
  "genres",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    slug: varchar("slug", {
      length: 100,
    }).notNull(),

    description: text("description"),

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
    slugUnique: uniqueIndex("genres_slug_unique").on(
      table.slug
    ),

    nameUnique: uniqueIndex("genres_name_unique").on(
      table.name
    ),

    nameIndex: index("genres_name_idx").on(
      table.name
    ),
  })
);