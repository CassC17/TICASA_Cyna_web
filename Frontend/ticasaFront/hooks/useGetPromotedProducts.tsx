import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import { getApiUrl } from "../config";

export default function useGetAllPromotedProducts() {
  const [prodPromoted, setProdPromoted] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllPromotedProducts = async () => {
      try {
        const response = await fetch(`${getApiUrl()}/products/list/promoted`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Données reçues invalides : Ce n'est pas un tableau.");
        }

        const formattedData: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.name ?? "Nom inconnu",
          image: item.image ?? "placeholder",
          price: item.price ?? 0,
          description: item.description ?? "Pas de description",
          activePromoId: item.activePromoId ?? null,
        }));

        setProdPromoted(formattedData);
        console.log("Promoted products fetched:", formattedData);
      } catch (err) {
        console.error("Erreur lors du fetch des produits promus:", err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllPromotedProducts();
  }, []);

  return { prodPromoted, isLoading, error };
}
