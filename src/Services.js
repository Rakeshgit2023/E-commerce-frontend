import apiClient from "./apiClient";

export const postData = async ({
  endPoint,
  payload,
  onSuccess,
  onError,
  signal,
}) => {
  const retry = () =>
    postData({ endPoint, payload, onSuccess, onError, signal });
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    // ✅ Build config first
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // ✅ THIS is what Axios needs
    };

    // ✅ Add signal if provided
    if (signal) {
      config.signal = signal;
    }
    const response = await apiClient.post(endPoint, payload, config);
    onSuccess(response?.data);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.log(error);
      onError(error); // Handle only non-aborted errors
    }
  }
};

export const getAPI = async ({ endPoint, onSuccess, onError, signal }) => {
  const retry = () => getAPI({ endPoint, onSuccess, onError, signal });
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    // ✅ Build config first
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // ✅ Add signal if provided
    if (signal) {
      config.signal = signal;
    }
    const response = await apiClient.get(endPoint, config);
    onSuccess(response?.data);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.log(error);
      onError(error); // Handle only non-aborted errors
    }
  }
};

export const deleteData = async ({ endPoint, onSuccess, onError, payload }) => {
  const retry = () => deleteData({ endPoint, onSuccess, onError, payload });
  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const response = await apiClient.delete(endPoint, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    });
    onSuccess(response?.data);
  } catch (error) {
    console.log(error);
    onError(error);
  }
};
