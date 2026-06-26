import { eq } from "drizzle-orm";
import db from "../db.js";
import { getStoryDetail } from "./story/story.query.js";
import { getCreators } from "./story/creator.query.js";
import { getDetails } from "./story/detail.query.js";
import { getServices } from "./story/service.query.js";
import { getChapters } from "./story/chapter.query.js";

export async function getStory(slug) {

  const stories = await getStoryDetail(slug);

  if (!stories) {
    return null;
  }

  const id = stories.id;

  const [
    creators,
    details,
    services,
    chapters
  ] = await Promise.all([
    getCreators(id),
    getDetails(id),
    getServices(id),
    getChapters(id)
  ]);

  return {
    ...stories,
    creators,
    details,
    services,
    chapters
  };
}