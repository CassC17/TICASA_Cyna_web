import express from "express";
import { createProduct, modifyProduct, deleteProduct, listProducts, listPromotedProducts } from "../controllers/product.controller";
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Ajouter un produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop Dell
 *               price:
 *                 type: number
 *                 example: 999.99
 *               fournisseur:
 *                 type: string
 *                 example: Dell
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *               activePromoId:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: Produit ajouté avec succès
 *       400:
 *         description: Erreur de validation des données
 */
router.post("/create", authenticate, authorizeAdmin, createProduct);

/**
 * @swagger
 * /products/modify/{id}:
 *   put:
 *     summary: Modifier un produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Laptop HP
 *               price:
 *                 type: number
 *                 example: 899.99
 *               fournisseur:
 *                 type: string
 *                 example: HP
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Produit mis à jour avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.put("/modify/:id", authenticate, authorizeAdmin, modifyProduct);

/**
 * @swagger
 * /products/delete/{id}:
 *   delete:
 *     summary: Supprimer un produit
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produit supprimé avec succès
 *       404:
 *         description: Produit non trouvé
 */
router.delete("/delete/:id", authenticate, authorizeAdmin, deleteProduct);

/**
 * @swagger
 * /products/list:
 *   get:
 *     summary: Lister les produits
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits
 */
router.get("/list", listProducts);

/**
 * @swagger
 * /products/list/promoted:
 *   get:
 *     summary: Lister les produits en promotion
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Liste des produits en promotion
 */
router.get("/list/promoted", listPromotedProducts);

export default router;
