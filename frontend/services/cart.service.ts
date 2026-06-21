import api from "./api";

// Add item to cart (FIXED)
export const addToCart = async (
  itemId: string,
  quantity: number = 1,
  type: "food" | "grocery"
) => {
  const res = await api.post("/cart", {
    itemId,
    quantity,
    type,
  });

  return res.data;
};

// Get cart
export const getCart = async () => {
  const res = await api.get("/cart");
  return res.data.data;
};

// Update quantity (FIXED ROUTE SAFER)
export const updateCart = async (itemId: string, quantity: number) => {
  const res = await api.put(`/cart/${itemId}`, {
    quantity,
  });

  return res.data;
};

// Remove item
export const removeFromCart = async (itemId: string) => {
  const res = await api.delete(`/cart/${itemId}`);
  return res.data;
};