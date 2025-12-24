import apiClient from "@/libs/apiClient";

export type LoginPayload = { email: string; role?: string };
export type RegisterPayload = { 
  name: string; 
  email: string; 
  password_hash: string;
  role?: "patient" | "doctor";
  phone?: string;
  location?: string;
};

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await apiClient.post("/user/login", payload);
    return data;
  },
  register: async (payload: RegisterPayload) => {
    const { data } = await apiClient.post("/user/register", payload);
    return data;
  },
};


