const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  const { courses } = req.body;
  const userId = req.user.id;

  if (courses.length === 0) {
    return res.json({
      succees: false,
      message: "Please provide course Id",
    });
  }

  let totalAmount = 0;
  for (const course_id of courses) {
    let course;
    try {
      course = await Course.findById(course_id);

      //if course is not available
      if (!course) {
        return res.status(200).json({
          succees: false,
          message: "Could not find the course",
        });
      }

      //check if user already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          succees: false,
          message: "User already enrolled in the course",
        });
      }

      totalAmount += course.price;
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        succees: false,
        message: error.message,
      });
    }
  }

  const options = {
    amount: totalAmount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  };

  try {
    const paymentResponse = await instance.orders.create(options);
    res.json({
      success: true,
      message: paymentResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;

  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res);
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }

  return res.status(200).json({ success: false, message: "Payment Failed" });
};

const enrollStudents = async (courses, userId, res) => {
  //validation
  if (!courses || !userId) {
    return res.status(400).json({
      succees: false,
      message: "Please provide data for courses or userId",
    });
  }

  //enroll user in each course
  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          succees: false,
          message: "Course not found",
        });
      }

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        completedVideos: [],
        userId: userId,
      });
      //add courses to the user model
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId, courseProgress: courseProgress } },
        { new: true }
      );

      //send confimation mail to the user
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulation, you have enrolled in a new course ",
        courseEnrollmentEmail(
          enrolledStudent.courseName,
          `${enrolledStudent.firstName}`
        )
      );

      console.log("Course enrollment mail has been sent");
      console.log("Course enrollement email respnse: ", emailResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        succees: false,
        message: error.message,
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount) {
    return res.status(400).json({
      succees: false,
      message: "Please provide all the fields",
    });
  }

  try {
    //find student
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("Error in sending mail", error);
    return res.status(500).json({
      succees: false,
      message: "Could not send email",
    });
  }
};

//capture the payment and initiate the razorpay orders
// exports.capturePayment = async (req, res) => {
//   //get courseId & userId
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   //validation
//   if (!courseId) {
//     return res.json({
//       success: false,
//       message: "Please provide valid course ID",
//     });
//   }

//   //valid courseId
//   let course;
//   try {
//     course = await Course.findById(courseId);

//     if (!course) {
//       return res.json({
//         success: false,
//         message: "Could not find the course",
//       });
//     }

//     //is user already purchased the course?
//     const uid = new mongoose.Types.ObjectId(userId); //here userId is in string format but in schema it is in object id format
//     if (course.studentsEnrolled.inlcludes(uid)) {
//       return res.json({
//         success: false,
//         message: "Student is already enrolled",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }

//   //order create
//   const amount = course.price;
//   const currency = "INR";

//   const options = {
//     amount: amount * 100,
//     currency,
//     receipt: Math.random(Date.now()).toString,
//     notes: {
//       course_id: courseId,
//       user_id: userId,
//     },
//   };

//   try {
//     //intiate the payment using razorpay
//     const paymentResponse = await instance.orders.create(options);
//     console.log(paymentResponse);

//     res.status(200).json({
//       success: true,
//       couseName: course.courseName,
//       courseDescription: course.courseDescription,
//       thumbnail: course.thumbnail,
//       orderId: paymentResponse.id,
//       currency: paymentResponse.currency,
//       amount: paymentResponse.amount,
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Could not initiate order",
//     });
//   }
// };

// //verify signature of razorpay and server
// exports.verifySignature = async (req, res) => {
//   //it is our signature
//   const webhookSecret = "123456789";

//   //this signature from razorpay request
//   const signature = req.headers("x-razorpay-signature");

//   //imp 3 steps (fixed syntax)
//   const shaSum = crypto.createHmac("sha256", webhookSecret);
//   shaSum.update(JSON.stringify(req.body));
//   const digest = shaSum.digest("hex");

//   if (signature === digest) {
//     console.log("Payment is Authorised");

//     //fetch data
//     const { courseId, userId } = req.body.payload.payment.entity.notes;

//     try {
//       //make entry in db

//       //find course and enroll student in it
//       const enrolledCourse = await Course.findOneAndUpdate(
//         {
//           _id: courseId,
//         },
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );

//       if(!enrolledCourse) {
//         return res.status(500).json({
//             success:false,
//             message: "Course not found"
//         })
//       }

//       console.log(enrolledCourse)

//       //find the student and add that course in enrolledCOurses
//       const enrolledStudent = await User.findOneAndUpdate(
//         {_id:userId},
//         {$push: {courses: courseId}},
//         {new:true}
//       )
//       console.log(enrolledStudent)

//       //send mail of confirmation
//       const emailResponse = await mailSender(
//         enrolledStudent.email,
//         "Congratulation,from prashant ",
//         " you are enrolled into new course"
//       )

//         console.log(emailResponse)

//         res.status(200).json({
//             success:true,
//             message: "Signature verified and course added and email sent"
//         })

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
//   }

//   else {
//     return res.status(400).json({
//         success:false,
//         message: "Invalid request"
//     })
//   }
// };
