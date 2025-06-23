import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { createOrder,  getUserOrdersByEmail } from "../controllers/order.controller";

const router = Router();

router.post("/", authenticate, createOrder);
router.get("/history", authenticate, getUserOrdersByEmail);

export default router;
