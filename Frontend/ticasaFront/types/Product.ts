export interface Product {
    id: number;
    nom: string; // ✅ Utilisation de 'nom' au lieu de 'name'
    image: string;
    price: number;
    description?: string;
    activePromoId?: number | null; // ✅ Ajout de activePromoId
  }
  