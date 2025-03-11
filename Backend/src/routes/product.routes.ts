import express from "express";
import { createProduct } from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/create",  createProduct); 
export default router;
