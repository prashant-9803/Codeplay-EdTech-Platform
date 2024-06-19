import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    logo: Logo2,
    heading: "Responsibility",
    description: "Students will always be our top priority",
  },
  {
    logo: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    logo: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

const TimeLineSection = () => {
  return (
    <div className="">
      <div className="flex gap-14 items-center">


        {/* left section */}
        <div className="flex flex-col w-[45%] gap-5">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col lg:gap-3" key={index}>
                <div className="flex gap-6" key={index}>
                  {/* leftImage */}
                  <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-[50%]">
                    <img src={element.logo} />
                  </div>

                  {/* rightSide */}
                  <div>
                    <h2 className="font-semibold text-[18px] ">
                      {element.heading}
                    </h2>
                    <p className="text-base">{element.description}</p>
                  </div>
                </div>
                <div
                  className={` h-14 border-dotted border-r border-richblack-100  w-[26px]`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* right section */}
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px] ">

            <img src={timelineImage} className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"/>

            {/* overlapping part */}
            <div className="absolute bg-caribbeangreen-700 flex text-white uppercase py-8  left-[50%] translate-x-[-50%] translate-y-[-50%]">

                {/* left text */}
                <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-7">
                    <p className="text-3xl font-bold px-8">10</p>
                    <p className="text-caribbeangreen-300 text-sm">Year of Experience</p>
                </div>

                {/* right text */}
                <div className="flex gap-5 items-center px-7 min-w-max">
                <p className="text-3xl font-bold px-8">250</p>
                    <p className="text-caribbeangreen-300 text-sm">Types of <br/>courses</p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineSection;
