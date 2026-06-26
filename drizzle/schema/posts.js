import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id").references(() => users.id),
});