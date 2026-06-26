import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const authors = pgTable(
  "authors",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    slug: varchar("slug", {
      length: 255,
    }).notNull(),

    bio: text("bio"),

    avatarUrl: text("avatar_url"),

    website: text("website"),

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
    slugUnique: uniqueIndex("authors_slug_unique").on(
      table.slug
    ),

    nameIndex: index("authors_name_idx").on(
      table.name
    ),
  })
);