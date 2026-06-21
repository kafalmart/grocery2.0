const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// GET ALL RESTAURANTS
export const getRestaurants = async () => {
  const res = await fetch(`${API_BASE}/restaurants`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch restaurants");
  }

  return res.json();
};

// GET SINGLE RESTAURANT
export const getRestaurantById = async (id: string) => {
  const res = await fetch(`${API_BASE}/restaurants/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch restaurant");
  }

  return res.json();
};

// GET FOODS OF RESTAURANT
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
    throw new Error("Failed to fetch foods");
  }

  return res.json();
};