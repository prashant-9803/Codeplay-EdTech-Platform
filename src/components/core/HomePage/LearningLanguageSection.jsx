import React from "react";
import HighlightText from "../HomePage/HighlightText";
import know_your_progess from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../HomePage/Button"

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col mb-28 mt-28 items-center">

        {/* heading */}
        <div className="text-4xl font-semibold text-center ">
          Your swiss knife for
          <HighlightText text={" learning any language"} />
        </div>

        {/* subHeading */}
        <div className="text-center text-base text-richblack-600 mx-auto font-medium w-[80%]">
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </div>


        {/* images container */}
        <div className="flex items-center justify-center">

          {/* img1 */}
          <img src={know_your_progess}
          alt="know_your_progress"
          className="object-contain -mr-32"
          />

          {/* img2 */}
          <img src={compare_with_others}
          alt="compare_with_others"
          className="object-contain"
          />

          {/* img3 */}
          <img src={plan_your_lesson}
          alt="plan_your_lesson"
          className="object-contain -ml-36"
          />

        </div>

        {/* button */}
        <div className="w-fit">
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>

      </div>
    </div>
  );
};

export default LearningLanguageSection;
