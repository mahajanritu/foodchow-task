import { useEffect, useState } from "react";
import { fetchRestaurantMenu } from "../utils/api";

export function useMenuData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMenu = async () => {
    try {
      setLoading(true);
      setError("");

      const menuData = await fetchRestaurantMenu();

      setData(menuData);
    } catch (err) {
      console.error("Menu API Error:", err);
      setError(err.message || "Unable to load menu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return {
    data,
    loading,
    error,
    retry: loadMenu,
  };
}