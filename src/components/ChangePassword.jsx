import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { postData } from "@/Services"; // ADD THIS IMPORT
import { showErrorToast, showSuccessToast } from "./Toast";
import { Eye, EyeOff } from "lucide-react";

export const ChangePassword = () => {
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Current password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      console.log(values);
      postData({
        endPoint: "/auth/update-password",
        payload: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          email: sessionStorage.getItem("email"),
        },
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
    <div className="flex-1 flex items-center justify-center md:rounded-r-xl bg-white p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Change Password
          </h2>
          <p className="mt-1 sm:mt-2 text-sm text-gray-500">
            Enter your current and new password.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              />
              {formik.values.currentPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <p className="text-xs text-red-600">
                {formik.errors.currentPassword}
              </p>
            ) : (
              <p className="text-xs invisible">Placeholder</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="••••••••"
                className={`w-full px-4 py-2.5 text-sm border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-400 ${
                  formik.touched.newPassword && formik.errors.newPassword
                    ? "border-red-300"
                    : "border-gray-200"
                }`}
              />
              {formik.values.newPassword && (
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              )}
            </div>
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <p className="text-xs text-red-600">
                {formik.errors.newPassword}
              </p>
            ) : (
              <p className="text-xs invisible">Placeholder</p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full py-2.5 text-sm text-white font-semibold rounded-lg bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 disabled:opacity-60"
          >
            {formik.isSubmitting ? "Updating..." : "Change Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
