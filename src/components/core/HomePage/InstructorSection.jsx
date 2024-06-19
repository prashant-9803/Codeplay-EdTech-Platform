import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import { FaArrowRight } from 'react-icons/fa6'

const InstructorSection = () => {
  return (
    <div className='mt-16 w-full'>
        
        <div className='flex gap-20 items-center w-full'>

            {/* left image */}
            <div className='w-[50%]'>
                <img src={Instructor} alt='Instructor' className='shadow-white shadow-[-20px_-20px_0_0] w-full'/>
            </div>


            {/* right section */}
            <div className='w-[50%] flex flex-col gap-10'>

                {/* heading */}
                <div className='text-4xl font-semibold '>
                    Become an <br/>
                    <HighlightText text={" Instructor"}/>
                </div>

                {/* subHeading */}
                <p className='font-medium text-[16px] w-[85%] text-richblack-300'>Instructors from around the world teach millions of students on CodePlay. We provide the tools and skills to teach what you love.</p>

                {/* button */}
                <div className='w-fit'>
                    <CTAButton active={true} linkto={"/signup"} >
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>



        </div>
    
    </div>
  )
}

export default InstructorSection