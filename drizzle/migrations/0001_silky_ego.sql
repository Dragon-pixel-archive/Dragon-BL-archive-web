CREATE TYPE "public"."story_status" AS ENUM('ongoing', 'completed', 'hiatus', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."translation_status" AS ENUM('ongoing', 'completed', 'dropped');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."character_role" AS ENUM('TOP', 'BOTTOM', 'MAIN', 'SIDE');--> statement-breakpoint
CREATE TABLE "artists" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"website" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "authors" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"website" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chapter_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"chapter_id" integer NOT NULL,
	"image_url" text NOT NULL,
	"image_order" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_id" integer NOT NULL,
	"chapter_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"story_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(50) NOT NULL,
	"description" text,
	"avatar_url" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "genres" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"original_title" varchar(255),
	"slug" varchar(255) NOT NULL,
	"description" text,
	"cover_url" text,
	"banner_url" text,
	"status" "story_status" DEFAULT 'ongoing' NOT NULL,
	"translation_status" "translation_status" DEFAULT 'ongoing' NOT NULL,
	"rating_average" numeric(3, 2) DEFAULT '0.00' NOT NULL,
	"rating_count" integer DEFAULT 0 NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"follows" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "types" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(10) NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "publishers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"website" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "translators" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"bio" text,
	"avatar_url" text,
	"website" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "story_authors" (
	"story_id" integer NOT NULL,
	"author_id" integer NOT NULL,
	CONSTRAINT "story_authors_story_id_author_id_pk" PRIMARY KEY("story_id","author_id")
);
--> statement-breakpoint
CREATE TABLE "story_artists" (
	"story_id" integer NOT NULL,
	"artist_id" integer NOT NULL,
	CONSTRAINT "story_artists_story_id_artist_id_pk" PRIMARY KEY("story_id","artist_id")
);
--> statement-breakpoint
CREATE TABLE "story_publishers" (
	"story_id" integer NOT NULL,
	"publisher_id" integer NOT NULL,
	CONSTRAINT "story_publishers_story_id_publisher_id_pk" PRIMARY KEY("story_id","publisher_id")
);
--> statement-breakpoint
CREATE TABLE "story_translators" (
	"story_id" integer NOT NULL,
	"translator_id" integer NOT NULL,
	CONSTRAINT "story_translators_story_id_translator_id_pk" PRIMARY KEY("story_id","translator_id")
);
--> statement-breakpoint
CREATE TABLE "story_genres" (
	"story_id" integer NOT NULL,
	"genre_id" integer NOT NULL,
	CONSTRAINT "story_genres_story_id_genre_id_pk" PRIMARY KEY("story_id","genre_id")
);
--> statement-breakpoint
CREATE TABLE "story_types" (
	"story_id" integer NOT NULL,
	"type_id" integer NOT NULL,
	CONSTRAINT "story_types_story_id_type_id_pk" PRIMARY KEY("story_id","type_id")
);
--> statement-breakpoint
CREATE TABLE "story_languages" (
	"story_id" integer NOT NULL,
	"language_id" integer NOT NULL,
	CONSTRAINT "story_languages_story_id_language_id_pk" PRIMARY KEY("story_id","language_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
ALTER TABLE "chapter_images" ADD CONSTRAINT "chapter_images_chapter_id_chapters_id_fk" FOREIGN KEY ("chapter_id") REFERENCES "public"."chapters"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "characters" ADD CONSTRAINT "characters_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_authors" ADD CONSTRAINT "story_authors_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_authors" ADD CONSTRAINT "story_authors_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_artists" ADD CONSTRAINT "story_artists_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_artists" ADD CONSTRAINT "story_artists_artist_id_artists_id_fk" FOREIGN KEY ("artist_id") REFERENCES "public"."artists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_publishers" ADD CONSTRAINT "story_publishers_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_publishers" ADD CONSTRAINT "story_publishers_publisher_id_publishers_id_fk" FOREIGN KEY ("publisher_id") REFERENCES "public"."publishers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_translators" ADD CONSTRAINT "story_translators_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_translators" ADD CONSTRAINT "story_translators_translator_id_translators_id_fk" FOREIGN KEY ("translator_id") REFERENCES "public"."translators"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_genres" ADD CONSTRAINT "story_genres_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_genres" ADD CONSTRAINT "story_genres_genre_id_genres_id_fk" FOREIGN KEY ("genre_id") REFERENCES "public"."genres"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_types" ADD CONSTRAINT "story_types_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_types" ADD CONSTRAINT "story_types_type_id_types_id_fk" FOREIGN KEY ("type_id") REFERENCES "public"."types"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_languages" ADD CONSTRAINT "story_languages_story_id_stories_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "story_languages" ADD CONSTRAINT "story_languages_language_id_languages_id_fk" FOREIGN KEY ("language_id") REFERENCES "public"."languages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "artists_slug_unique" ON "artists" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "artists_name_idx" ON "artists" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "authors_slug_unique" ON "authors" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "authors_name_idx" ON "authors" USING btree ("name");--> statement-breakpoint
CREATE INDEX "chapter_images_chapter_idx" ON "chapter_images" USING btree ("chapter_id");--> statement-breakpoint
CREATE INDEX "chapter_images_chapter_order_idx" ON "chapter_images" USING btree ("chapter_id","image_order");--> statement-breakpoint
CREATE UNIQUE INDEX "chapters_story_chapter_unique" ON "chapters" USING btree ("story_id","chapter_number");--> statement-breakpoint
CREATE UNIQUE INDEX "chapters_slug_unique" ON "chapters" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "chapters_story_idx" ON "chapters" USING btree ("story_id");--> statement-breakpoint
CREATE INDEX "chapters_number_idx" ON "chapters" USING btree ("chapter_number");--> statement-breakpoint
CREATE INDEX "chapters_story_number_idx" ON "chapters" USING btree ("story_id","chapter_number");--> statement-breakpoint
CREATE INDEX "characters_story_idx" ON "characters" USING btree ("story_id");--> statement-breakpoint
CREATE INDEX "characters_role_idx" ON "characters" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_slug_unique" ON "genres" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "genres_name_unique" ON "genres" USING btree ("name");--> statement-breakpoint
CREATE INDEX "genres_name_idx" ON "genres" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_unique" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "stories_slug_unique" ON "stories" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "stories_title_idx" ON "stories" USING btree ("title");--> statement-breakpoint
CREATE INDEX "stories_status_idx" ON "stories" USING btree ("status");--> statement-breakpoint
CREATE INDEX "stories_translation_status_idx" ON "stories" USING btree ("translation_status");--> statement-breakpoint
CREATE INDEX "stories_rating_idx" ON "stories" USING btree ("rating_average");--> statement-breakpoint
CREATE INDEX "stories_follows_idx" ON "stories" USING btree ("follows");--> statement-breakpoint
CREATE INDEX "stories_views_idx" ON "stories" USING btree ("views");--> statement-breakpoint
CREATE UNIQUE INDEX "types_slug_unique" ON "types" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "types_name_unique" ON "types" USING btree ("name");--> statement-breakpoint
CREATE INDEX "types_name_idx" ON "types" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "languages_code_unique" ON "languages" USING btree ("code");--> statement-breakpoint
CREATE UNIQUE INDEX "languages_name_unique" ON "languages" USING btree ("name");--> statement-breakpoint
CREATE INDEX "languages_name_idx" ON "languages" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "publishers_slug_unique" ON "publishers" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "publishers_name_idx" ON "publishers" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "translators_slug_unique" ON "translators" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "translators_name_idx" ON "translators" USING btree ("name");--> statement-breakpoint
CREATE INDEX "story_authors_author_idx" ON "story_authors" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "story_artists_artist_idx" ON "story_artists" USING btree ("artist_id");--> statement-breakpoint
CREATE INDEX "story_publishers_publisher_idx" ON "story_publishers" USING btree ("publisher_id");--> statement-breakpoint
CREATE INDEX "story_translators_translator_idx" ON "story_translators" USING btree ("translator_id");--> statement-breakpoint
CREATE INDEX "story_genres_genre_idx" ON "story_genres" USING btree ("genre_id");--> statement-breakpoint
CREATE INDEX "story_types_type_idx" ON "story_types" USING btree ("type_id");--> statement-breakpoint
CREATE INDEX "story_languages_lang_idx" ON "story_languages" USING btree ("language_id");