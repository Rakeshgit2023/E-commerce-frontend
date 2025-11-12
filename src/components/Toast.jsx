// src/utils/toastService.js
import { toast } from "react-toastify";

// ✅ Default configuration
const defaultConfig = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

// ✅ Different types of toasts

export const showSuccessToast = (message) => {
  toast.success(message || "Success!", defaultConfig);
};

export const showErrorToast = (message) => {
  toast.error(message || "Something went wrong!", defaultConfig);
};

export const showInfoToast = (message) => {
  toast.info(message || "Here’s some information!", defaultConfig);
};

export const showWarningToast = (message) => {
  toast.warning(message || "Be careful!", defaultConfig);
};

export const showDefaultToast = (message) => {
  toast(message || "Default notification", defaultConfig);
};

// ✅ Promise-based toast example
export const showPromiseToast = (promiseFn, messages) => {
  toast.promise(promiseFn, {
    pending: messages?.pending || "Processing...",
    success: messages?.success || "Completed successfully 👌",
    error: messages?.error || "Something went wrong 🤯",
  });
};
