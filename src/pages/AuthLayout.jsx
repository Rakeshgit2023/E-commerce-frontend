import React from "react";
import kidsLogin from "../assets/images/kidsLogin.png";
import { SignIn } from "../components/SignIn";
import { useLocation } from "react-router-dom";
import { ForgotPassword } from "@/components/ForgotPassword";
import { ChangePassword } from "@/components/ChangePassword";
import { SignUp } from "@/components/SignUp";
const AuthLayout = () => {
  const location = useLocation();
  return (
    <div className="h-screen w-screen overflow-hidden md:p-6 lg:p-8 xl:py-8 xl:px-32 2xl:py-12 2xl:px-60 bg-slate-50 ">
      <div className="flex h-full shadow-xl rounded-xl">
        {/* Left Image */}
        <div className="hidden md:flex flex-1 relative">
          <img
            src={kidsLogin}
            // "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1400&auto=format&fit=crop"
            alt="Stylish outfit"
            className="absolute inset-0 w-full h-full rounded-l-xl object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent rounded-bl-xl" />
          <div className="absolute bottom-8 left-4 lg:left-8 text-white">
            <h3 className="text-xl lg:text-2xl font-semibold">
              Step Into Style
            </h3>
            <p className="mt-2 text-[13px] lg:text-sm max-w-xs">
              Sign in to discover curated looks, exclusive drops and fast
              checkout.
            </p>
          </div>
        </div>

        {/* Right Form */}
        {location.pathname === "/signUp" ? (
          <SignUp />
        ) : location.pathname === "/signIn" ? (
          <SignIn />
        ) : location.pathname === "/forgotPassword" ? (
          <ForgotPassword />
        ) : (
          location.pathname === "/changePassword" && <ChangePassword />
        )}
      </div>
    </div>
  );
};
export default AuthLayout;
