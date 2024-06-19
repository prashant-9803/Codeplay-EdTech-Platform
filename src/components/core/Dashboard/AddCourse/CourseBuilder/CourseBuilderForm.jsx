import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import IconBtn from "../../../../common/IconBtn";
import {MdNavigateNext} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //fetch a course from courseSlice
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const {token} = useSelector(state => state.auth)

  // to toggle create section name text and edit section name text in a same button & more
  const [editSectionName, setEditSectionName] = useState(null);

  //function to cancel edit button
  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  //goBack handler
  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  //goToNext handler
  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add at least 1 section");
      return
    }

    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add at least 1 lecture in each Section");
      return
    }

    dispatch(setStep(3));
  };

  //submit handler
  const onSubmit = async (data) => {
    setLoading(true)
    let result;

    if(editSectionName) {
        //we are editing the sectionName
        result = await updateSection({
            sectionName: data.sectionName,
            sectionId: editSectionName,
            courseId: course._id,
        }, token)
    }
    else {
        //we are creating section
        result = await createSection({
            sectionName: data.sectionName,
            courseId: course._id
        }, token)
    }

    //updation/creation of course successfull
    if(result) {
        dispatch(setCourse(result))
        setEditCourse(null)
        setValue("sectionName", "")
    }

    setLoading(false)
  };


  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if(editSectionName === sectionId) {
        cancelEdit()
        return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName)
  }

  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
      <p className="text-2xl font-semibold text-richblue-5 ">Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 pb-5">
          {/* label */}
          <label className="text-sm text-richblack-5 " htmlFor="sectionName">
            Section Name
            <sup className="text-pink-200">*</sup>
          </label>

          {/* input Field */}
          <input
            id="sectionName"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="form-style w-full"
          />

          {errors.sectionName && (
            <span className="ml-2 text-xs tracking-wide text-pink-200">
              Section name is required
            </span>
          )}
        </div>

        <div className="flex items-end gap-x-4 ">
          {/* create section button TOGGLE:*/}
          <IconBtn
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
          >
            <IoAddCircleOutline size={20} className="text-yellow-50" />
          </IconBtn>

          {/* cancel edit button while editing */}
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* nested view */}
      {(
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>)}

      {/* next prev button */}
      <div className="flex justify-end gap-x-3">
        <button
          onClick={goBack}
          className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
        >
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </div>
    
  );
};

export default CourseBuilderForm;
