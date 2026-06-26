import { getChapter } from "../services/chapter.service.js";
import { getStory } from "../services/story.service.js";

export async function getStoryDetailController(req, res) {
  try {
    const { slug } = req.params;

    const story = await getStory(slug);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    return res.json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function getChapterController(req, res) {

  try {
    const { storySlug, chapterNumber } = req.params;

    const chapter = await getChapter(storySlug, chapterNumber);

    if(!chapter){
      return res.status(404).json({
        success: false,
        message: "Chapter not found!",
      });
    }

    return res.json({
      success: true,
      data: chapter,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}