import { Router } from "express";
import { getStoryDetailController } from "../controllers/story.controller.js";
import { getChapterController } from "../controllers/story.controller.js";

const router = Router();

router.get("/:slug", getStoryDetailController);
router.get("/:storySlug/chapters/:chapterNumber", getChapterController);


export default router;