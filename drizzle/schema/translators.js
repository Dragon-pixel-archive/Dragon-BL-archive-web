import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const translators = pgTable(
  "translators",
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
    slugUnique: uniqueIndex("translators_slug_unique").on(table.slug),

    nameIndex: index("translators_name_idx").on(table.name),
  })
);