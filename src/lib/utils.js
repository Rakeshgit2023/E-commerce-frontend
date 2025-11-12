import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ✅ Check if user is logged in
export const isLoggedIn = () => {
  const remember = localStorage.getItem("rememberMe");
  const token =
    (remember === "true" && localStorage.getItem("token")) ||
    (remember === "false" && sessionStorage.getItem("token"));

  return !!token;
};
