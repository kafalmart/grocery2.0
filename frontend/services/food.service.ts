const API_BASE = process.env.NEXT_PUBLIC_API_URL;
export const getRestaurantFoods = async (
  restaurantId: string
) => {
  const res = await fetch(
    `${API_BASE}/foods/restaurant/${restaurantId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to fetch foods"
    );
  }

  return res.json();
};