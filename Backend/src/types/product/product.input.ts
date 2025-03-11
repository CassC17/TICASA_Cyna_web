import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { Expose } from "class-transformer";

export class CreateProductInput {
  @Expose()
  @IsNotEmpty({ message: "Le nom du produit est obligatoire" })
  name!: string;

  @Expose()
  @IsNumber({}, { message: "Le prix doit être un nombre" })
  @Min(0, { message: "Le prix doit être positif" })
  price!: number;

  @Expose()
  @IsNotEmpty({ message: "Le fournisseur est obligatoire" })
  fournisseur!: string;

  @Expose()
  @IsNumber({}, { message: "L'ID de la catégorie est obligatoire" })
  categoryId!: number;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: "L'ID de la promotion doit être un nombre" })
  activePromoId?: number | null;
}

export class UpdateProductInput {
  @Expose()
  @IsOptional()
  @IsNotEmpty({ message: "Le nom du produit ne peut pas être vide" })
  name?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: "Le prix doit être un nombre" })
  @Min(0, { message: "Le prix doit être positif" })
  price?: number;

  @Expose()
  @IsOptional()
  @IsNotEmpty({ message: "Le fournisseur ne peut pas être vide" })
  fournisseur?: string;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: "L'ID de la catégorie doit être un nombre" })
  categoryId?: number;

  @Expose()
  @IsOptional()
  @IsNumber({}, { message: "L'ID de la promotion doit être un nombre" })
  activePromoId?: number | null;
}
