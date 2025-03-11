import express from "express";
import { createProduct } from "../controllers/product.controller";
import { modifyProduct } from "../controllers/product.controller";
import { deleteProduct } from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create",  createProduct);
router.put("/modify/:id", modifyProduct);
router.delete("/delete/:id", deleteProduct); 
export default router;
