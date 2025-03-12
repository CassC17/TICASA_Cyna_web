import { useState, useEffect } from "react";

export default function useGetAllProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/list");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        console.log("All products:", data);
      } catch (err) {
        setError(error);
      } finally {
        setIsLoading(false); // Always update loading state
      }
    };

    fetchAllProducts();
  }, []);

  return { products, isLoading, error };
}
