import { pgEnum } from "drizzle-orm/pg-core";

const userRoleEnum = pgEnum("user_role", [
  "user",
  "admin",
]);

const storyStatusEnum = pgEnum("story_status", [
  "ongoing",
  "completed",
  "hiatus",
  "cancelled",
]);

const translationStatusEnum = pgEnum("translation_status", [
  "ongoing",
  "completed",
  "dropped",
]);

const characterRoleEnum = pgEnum("character_role", [
  "TOP",
  "BOTTOM",
  "MAIN",
  "SIDE",
]);

export {
  userRoleEnum,
  storyStatusEnum,
  translationStatusEnum,
  characterRoleEnum,
};