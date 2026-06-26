import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const types = pgTable(
  "types",
  {
    id: serial("id").primaryKey(),

    name: varchar("name", {
      length: 100,
    }).notNull(),

    slug: varchar("slug", {
      length: 100,
    }).notNull(),

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
    slugUnique: uniqueIndex("types_slug_unique").on(
      table.slug
    ),

    nameUnique: uniqueIndex("types_name_unique").on(
      table.name
    ),

    nameIndex: index("types_name_idx").on(
      table.name
    ),
  })
);