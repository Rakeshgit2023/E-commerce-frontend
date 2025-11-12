import React from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "@/Services";
import { showErrorToast, showSuccessToast } from "./Toast";

export const ForgotPassword = () => {
  const nav = useNavigate();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      postData({
        endPoint: "/auth/isUserExist",
        payload: values,
        onSuccess: (response) => {
          nav("/changePassword");
          showSuccessToast(response.message);
          sessionStorage.setItem("email", response.user.email);
          setSubmitting(false);
        },
        onError: (error) => {
          showErrorToast(error.response?.data?.message || error.message);
          setSubmitting(false);
        },
      });
    },
  });

  return (
    <div className="flex-1 flex items-center justify-center md:rounded-r-xl bg-white p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Forgot Password
          </h2>
          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            Enter your email to receive password reset instructions.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[13px] sm:text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-transparent ${
                formik.touched.email && formik.errors.email
                  ? "border-red-300"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-xs text-red-600">{formik.errors.email}</p>
            ) : (
              <p className="text-xs invisible">R</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-2.5 sm:py-3 text-sm text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-60"
          >
            {formik.isSubmitting ? "Verifying..." : "Verify Email"}
          </button>

          <div className="text-center text-xs sm:text-sm text-gray-500">
            Remember your password?{" "}
            <span
              className="text-orange-600 cursor-pointer"
              onClick={() => nav("/signIn")}
            >
              Go back to sign in
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
