import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  isPromoted: boolean;
}

export default function useGetAllPromotedProducts() {
  const [prodPromoted, setProdPromoted] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllPromotedProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/products/list/promoted"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Product[] = await response.json(); // Explicitly type the API response
        setProdPromoted(data);
        console.log("Promoted products:", data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPromotedProducts();
  }, []);

  return { prodPromoted, isLoading, error };
}
