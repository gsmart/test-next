import axios from "axios";
import toast from "react-hot-toast";
import { ChecksumUtil } from "./checksum";

const apiClientOld = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Define reusable error messages
const errorMessages: Record<number, string> = {
  401: "Unauthorized. Please sign in again.",
  403: "Forbidden. You do not have permission to access this resource.",
  404: "Resource not found (404)",
  422: "Unprocessable entity. Please check your input.",
  500: "Internal Server Error. Please try again later.",
  502: "Bad Gateway. Please try again later.",
  503: "Service Unavailable. Please try again later.",
  504: "Gateway Timeout. Please try again later.",
};

apiClientOld.interceptors.request.use(
  (config) => {
    try {
      const fullUrl = `${config.baseURL}${config.url}`;
      const method = config.method?.toUpperCase() || "GET";
      const payload = config.data || {};

      const checksum = ChecksumUtil.generateChecksum(fullUrl, payload, method);

      // Attach headers
      config.headers["x-verify"] = checksum;
      config.headers["Content-Type"] = "application/json"; 
      config.headers["x-custom-referer"] = `http://localhost:3001/dentsuforms/${process.env.NEXT_PUBLIC_TENANTID}`;
      config.headers["x-custom-origin"] = "http://localhost:3001";
      config.headers["referer"] = `http://192.168.0.104:3000/`;
      config.headers["origin"] = "http://192.168.0.104:3000/";
    } catch (err) {
      console.error("Error generating checksum:", err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClientOld.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status) {
      const message =
        errorMessages[status] ||
        (status >= 500
          ? "Server error. Please try again later."
          : error.response?.data?.message || "Unexpected error occurred");

      toast.error(message);

      if (status === 401) {
        window.location.href = "/register-user";
      }
    } else {
      toast.error("Network error. Please check your connection.");
    }

    return Promise.reject(error);
  }
);

export default apiClientOld;
