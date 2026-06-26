import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { userRoleEnum } from "../enums.js";

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),

    username: text("username")
      .notNull(),

    password: text("password")
      .notNull(),

    role: userRoleEnum("role")
      .notNull()
      .default("user"),

    createdAt: timestamp("created_at")
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    usernameUnique: uniqueIndex("users_username_unique").on(table.username),
  })
);