import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  index,
  uniqueIndex,
  pgEnum,
} from "drizzle-orm/pg-core";

export const storyStatusEnum = pgEnum("story_status", [
  "ongoing",
  "completed",
  "hiatus",
  "cancelled",
]);

export const translationStatusEnum = pgEnum("translation_status", [
  "ongoing",
  "completed",
  "dropped",
]);

export const stories = pgTable(
  "stories",
  {
    id: serial("id").primaryKey(),

    title: varchar("title", { length: 255 }).notNull(),

    originalTitle: varchar("original_title", {
      length: 255,
    }),

    slug: varchar("slug", { length: 255 }).notNull(),

    description: text("description"),

    coverUrl: text("cover_url"),

    bannerUrl: text("banner_url"),

    status: storyStatusEnum("status")
      .notNull()
      .default("ongoing"),

    translationStatus: translationStatusEnum(
      "translation_status"
    )
      .notNull()
      .default("ongoing"),

    ratingAverage: numeric("rating_average", {
      precision: 3,
      scale: 2,
    })
      .notNull()
      .default("0.00"),

    ratingCount: integer("rating_count")
      .notNull()
      .default(0),

    views: integer("views")
      .notNull()
      .default(0),

    follows: integer("follows")
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
    slugUnique: uniqueIndex("stories_slug_unique").on(table.slug),

    titleIndex: index("stories_title_idx").on(table.title),

    statusIndex: index("stories_status_idx").on(table.status),

    translationStatusIndex: index(
      "stories_translation_status_idx"
    ).on(table.translationStatus),

    ratingIndex: index("stories_rating_idx").on(
      table.ratingAverage
    ),

    followsIndex: index("stories_follows_idx").on(
      table.follows
    ),

    viewsIndex: index("stories_views_idx").on(table.views),
  })
);