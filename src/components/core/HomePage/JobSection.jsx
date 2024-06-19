import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button"

const JobSection = () => {
  return (
    <div className="flex gap-10 mb-10 mt-20">

      {/* left section */}
      <div className="text-4xl font-semibold w-[45%] ">
        Get the skills you need for a
        <HighlightText text={" job that is in demand."} />
      </div>

      {/* right section */}
      <div className="flex flex-col gap-10 w-[55%] items-start pl-28">

        <div className="text-[16px]">
          The modern Codeplay is the dictates its own terms. Today, to be a
          competitive specialist requires more than professional skills.
        </div>

        <CTAButton active={true} linkto={"/signup"}>
          Learn More
        </CTAButton>
        
      </div>

    </div>
  );
};

export default JobSection;
