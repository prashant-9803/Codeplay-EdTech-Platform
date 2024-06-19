import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const [formData, setformData] = useState({
    password: "",
    confirmPassword: "",
  });

  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setformData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();

    //token extracted from the url
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="grid min-h-screen translate-y-[-70px] place-items-center ">
      {loading ? (
        <div className=".spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-100">Choose New Password</h1>
          <p>Almost done. Enter your new password and youre all set.</p>

          <form onSubmit={handleOnSubmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5 ">
                New Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                className="form-style w-full !pr-10"
                placeholder="Password"
              ></input>

              <span onClick={() => setshowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" /> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
              </span>
            </label>

            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Confirm New Password<sup className="text-pink-200">*</sup>
              </p>

              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className="form-style w-full !pr-10"
                placeholder="Confirm Password"
              ></input>

              <span onClick={() => setshowConfirmPassword((prev) => !prev)} 
              className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                {showConfirmPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>}
              </span>
            </label>

            <button type="submit" className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900">Reset Password</button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
              <p className="flex items-center gap-x-2 text-richblack-5 ">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
