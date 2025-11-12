import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "@/Services";
import { showErrorToast } from "./Toast";
import { Eye, EyeOff } from "lucide-react";
export const SignIn = () => {
  const nav = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: { email: "", password: "", remember: false },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      postData({
        endPoint: "/auth/login",
        payload: values,
        onSuccess: (response) => {
          console.log(response);
          if (values.remember) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
          } else {
            sessionStorage.setItem("token", response.token);
            sessionStorage.setItem("user", JSON.stringify(response.user));
          }
          localStorage.setItem("rememberMe", values.remember);
          setSubmitting(false);

          nav("/");
        },
        onError: (error) => {
          console.log(error);
          setError(
            error.response.data.message ? error.response.data.message : ""
          );
          setSubmitting(false);
          showErrorToast(error.response?.data?.message || error.message);
        },
      });
    },
  });

  useEffect(() => {
    const savedRemember = localStorage.getItem("rememberMe") === "true";
    formik.setFieldValue("remember", savedRemember);
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center md:rounded-r-xl bg-white p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md overflow-hidden"
      >
        <div className="text-center mb-5 md:mb-3 lg:mb-1.5 xl:mb-1 2xl:mb-2.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            Log in to continue your fashion journey.
          </p>
          <p className="text-red-500 text-xs text-center pt-2">{error}</p>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="space-y-4 2xl:space-y-3 px-1"
        >
          <div>
            <label className="block text-[13px] sm:text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
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

          <div className="md:mb-2 xl:mb-6">
            <label className="block text-[13px] sm:text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-transparent ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              />
              {formik.values.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-xs text-red-600">{formik.errors.password}</p>
            ) : (
              <p className="text-xs invisible">R</p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                checked={formik.values.remember}
                onChange={formik.handleChange}
                className="w-4 h-4 accent-orange-500 rounded"
              />
              <span className="text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-orange-600 hover:underline"
              onClick={() => nav("/forgotPassword")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-2.5 sm:py-3 text-sm text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-60"
          >
            {formik.isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center text-xs sm:text-sm text-gray-500">
            New here?{" "}
            <span
              className="text-orange-600 cursor-pointer"
              onClick={() => nav("/signUp")}
            >
              Create an account
            </span>
          </div>

          <div className="pt-2 lg:pt-1 xl:pt-2">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="bg-white px-2 text-gray-400">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
              >
                Apple
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
