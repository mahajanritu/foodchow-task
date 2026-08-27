const API_URL =
  "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null";

export async function fetchRestaurantMenu() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch restaurant menu");
  }

  const result = await response.json();

  let menuData = result?.data;

  // API can return data as a stringified JSON object
  if (typeof menuData === "string") {
    menuData = JSON.parse(menuData);
  }

  return menuData;
}