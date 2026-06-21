import api from "./api";

export const getProfile = async () => {
  const res = await api.get("/auth/me");
  return res.data.data;
};