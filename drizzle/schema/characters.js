import {
  pgTable,
  serial,
  integer,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

import { stories } from "./stories.js";

export const characters = pgTable(
  "characters",
  {
    id: serial("id").primaryKey(),

    storyId: integer("story_id")
      .notNull()
      .references(() => stories.id, {
        onDelete: "cascade",
      }),

    name: varchar("name", {
      length: 255,
    }).notNull(),

    role: varchar("role", {
      length: 50,
    }).notNull(), 
    

    description: text("description"),

    avatarUrl: text("avatar_url"),

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
    storyIndex: index("characters_story_idx").on(
      table.storyId
    ),

    roleIndex: index("characters_role_idx").on(
      table.role
    ),
  })
);