import api from "./api";

export const createOrder = async (data: {
  address: string;
  notes?: string;
  paymentMethod: "cod" | "prepaid";
  couponCode?: string;
}) => {
  const res = await api.post("/orders", data);
  return res.data.data;
};

export const getMyOrders = async () => {
  const res = await api.get("/orders");
  return res.data.data;
};

export const getOrderById = async (id: string) => {
  const res = await api.get(`/orders/${id}`);
  return res.data.data;
};