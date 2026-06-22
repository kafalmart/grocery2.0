import api from "./api";

export const createFeedback = async (
  orderId: string,
  data: {
    rating: number;
    comment: string;
  }
) => {
  const res = await api.post(
    `/feedback/${orderId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return res.data.data;
};

export const getMyFeedbacks = async () => {
  const res = await api.get(
    "/feedback/my",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(
          "token"
        )}`,
      },
    }
  );

  return res.data.data;
};

export const getAllFeedbacks = async () => {
  const res = await api.get("/feedback", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.data.data;
};