import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";

export const languages = pgTable(
  "languages",
  {
    id: serial("id").primaryKey(),

    code: varchar("code", {
      length: 10,
    }).notNull(),

    name: varchar("name", {
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
    codeUnique: uniqueIndex("languages_code_unique").on(
      table.code
    ),

    nameUnique: uniqueIndex("languages_name_unique").on(
      table.name
    ),

    nameIndex: index("languages_name_idx").on(
      table.name
    ),
  })
);