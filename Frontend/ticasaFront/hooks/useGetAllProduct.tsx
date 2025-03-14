import { useState, useEffect } from "react";

interface Product {
  id: number;
  nom: string;
  image: string;
  price: number;
  description?: string; // Optional field
}

export default function useGetAllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/products/list");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Product[] = await response.json();
        setProducts(data);
        console.log("All products:", data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return { products, isLoading, error };
}
