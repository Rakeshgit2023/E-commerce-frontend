import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "@/Services";
import { showErrorToast, showSuccessToast } from "./Toast";

export const SignUp = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log("Sign up data:", values);

      postData({
        endPoint: "/auth/register",
        payload: values,
        onSuccess: (response) => {
          nav("/signIn");
          showSuccessToast(response.message);
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
    <div className="flex-1 flex items-center justify-center md:rounded-r-xl bg-white p-6 md:p-12 overflow-y-auto md:overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            Join us on your fashion journey!
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-1 ">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="John"
              className={`mt-1 w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                formik.touched.firstName && formik.errors.name
                  ? "border-red-300"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.firstName && formik.errors.name ? (
              <p className="text-xs text-red-600">{formik.errors.name}</p>
            ) : (
              <p className="text-xs invisible">Placeholder</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="you@example.com"
              className={`mt-1 w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-300"
                  : "border-gray-200"
              }`}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-xs text-red-600">{formik.errors.email}</p>
            ) : (
              <p className="text-xs invisible">Placeholder</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-xs text-red-600">{formik.errors.password}</p>
            ) : (
              <p className="text-xs invisible">Placeholder</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="mt-4 sm:mt-2 lg:mt-0 w-full py-2.5 text-sm text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-60"
          >
            {formik.isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Link to Sign In */}
          <div className="text-center text-xs sm:text-sm text-gray-500">
            Already have an account?{" "}
            <span
              className="text-orange-600 cursor-pointer"
              onClick={() => nav("/signIn")}
            >
              Sign in
            </span>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
