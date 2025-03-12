import { useState, useEffect } from "react";

export default function useGetAllPromotedProducts() {
  const [prodPromoted, setProdPromoted] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllPromotedProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/list");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProdPromoted(data);
        console.log("All products:", data);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false); // Always update loading state
      }
    };

    fetchAllPromotedProducts();
  }, []);

  return { prodPromoted, isLoading, error };
}
