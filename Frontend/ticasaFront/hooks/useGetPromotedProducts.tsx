import { useState, useEffect } from "react";
import { Product } from "../types/Product"; // ✅ Import correct du type Product

export default function useGetAllPromotedProducts() {
  const [prodPromoted, setProdPromoted] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAllPromotedProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/list/promoted");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // ✅ Vérification que la réponse est bien un tableau
        if (!Array.isArray(data)) {
          throw new Error("Données reçues invalides : Ce n'est pas un tableau.");
        }

        // ✅ Transformation des données pour renommer 'name' en 'nom'
        const formattedData: Product[] = data.map((item: any) => ({
          id: item.id,
          nom: item.name ?? "Nom inconnu", // ✅ Conversion de name en nom
          image: item.image ?? "placeholder",
          price: item.price ?? 0,
          description: item.description ?? "Pas de description",
          activePromoId: item.activePromoId ?? null, // ✅ Ajout du champ pour éviter l'erreur
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
