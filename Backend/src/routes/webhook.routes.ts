import { Router } from "express";
import { stripeWebhook } from "../controllers/webhook.controller";
import bodyParser from "body-parser";

const router = Router();


router.post("/stripe", bodyParser.raw({ type: "application/json" }), stripeWebhook);

export default router;
