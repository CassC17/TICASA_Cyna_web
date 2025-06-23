import { useState, useEffect } from "react";
import { getApiUrl } from "../config";
import { Product } from "../types/Product";


export default function useGetProductByCategory(categoryId: number) {
    const [products, setProducts] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProductsByCategories = async () => {
          try {
            const response = await fetch(`${getApiUrl()}/categories/${categoryId}/products`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data: Product[] = await response.json();
            setProducts(data);
          } catch (err) {
            setError(err as Error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchProductsByCategories();
      }, []);
    
      return { products, isLoading, error };
}