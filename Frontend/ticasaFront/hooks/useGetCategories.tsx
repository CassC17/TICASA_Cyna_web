import { useState, useEffect } from "react";
import { getApiUrl } from "../config";
import { Category } from "../types/Category";

export default function useGetCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await fetch(`${getApiUrl()}/categories`);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data: Category[] = await response.json();
            setCategories(data);
          } catch (err) {
            setError(err as Error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchCategories();
      }, []);
    
      return { categories, isLoading, error };
}