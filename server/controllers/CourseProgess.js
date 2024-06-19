const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    //check if the subSection is valid
    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({ error: "Invalid Subsection Id" });
    }

    //check for old entry
    let courseProgress = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        error: "Course Progress does not exist",
      });
    } else {
      // check for recompleting video/subSection
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(404).json({
          success: false,
          error: "Already completed this section",
        });
      }
    }

    //push subSectionId in completedVideos
    courseProgress.completedVideos.push(subSectionId);
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: "Internal server error" });
  }
};
