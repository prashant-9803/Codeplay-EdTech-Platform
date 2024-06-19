import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from "../components/core/HomePage/HighlightText";
import Banner from "../assets/Images/banner.mp4";
import CTAButton from "../components/core/HomePage/Button"
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import JobSection from "../components/core/HomePage/JobSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import ReviewSlider from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-sm shadow-richblack-700">
            <div className="flex items-center gap-2 rounded-full py-[5px] px-10 transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />
        </div>

        <div className="mt-4 text-center text-lg font-light text-richblack-400 w-[85%]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex gap-7 mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        {/* video */}
        <div className="mx-3 my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            autoPlay
            loop
            src={Banner}
          />
        </div>

        {/* CodeSection 1 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold ">
                Unlock your <HighlightText text={"coding potential "} /> with
                our online courses.
              </div>
            }
            subHeading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true, //yellowBtn
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false, //yellowBtn
            }}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* CodeSection 2 */}

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={" coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore/>

      </div>


      {/* Section 2 */}
      <div className="bg-pure-greys-5 text-richblack-700">
        {/* Textured background */}
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex items-center justify-center gap-5 mx-auto">
            {/* Button div */}
            <div className="flex gap-7 text-white mt-52">
              {/* Button 1 */}
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center justify-center gap-2">
                  Explore Full Catalogue
                  <FaArrowRight />
                </div>
              </CTAButton>

              {/* Button 2 */}
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        {/* hero sections */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7">


          {/* hero 1 */}
          <JobSection/>

          {/* hero 2 */}
          <TimeLineSection/>

          {/* hero 3 */}
          <LearningLanguageSection/>
          
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-11/12 mx-auto max-w-maxContent flex flex-col justify-between items-center bg-richblack-900 text-white gap-8 my-10">
            
        {/* instructors section */}
        <InstructorSection/>

        <h2 className="text-4xl font-semibold mt-10 text-center">Review from other learners</h2>

        {/* Review slider */}
        <ReviewSlider/>
        

      </div>



      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Home;
