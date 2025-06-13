import { Request, Response } from "express";
import { stripe } from "../lib/stripe";
import { PrismaClient } from "@prisma/client";
import type Stripe from "stripe";

const prisma = new PrismaClient();

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  isSubscription?: boolean;
  duration?: string;
};

export const stripeWebhook = async (req: Request, res: Response): Promise<void> => {
    console.log("⚠️ Webhook Stripe reçu :", req.body);
  const sig = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Erreur Webhook Stripe:", err);
    res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (!session.metadata || !session.customer_email) {
      console.error("Données manquantes dans la session");
      res.status(400).send("Email ou metadata manquants");
      return;
    }

    const cartItems: CartItem[] = JSON.parse(session.metadata.cartItems);

    const user = await prisma.user.findUnique({
      where: { email: session.customer_email },
    });

    if (!user) {
      console.error("Utilisateur introuvable avec email:", session.customer_email);
      res.status(404).send("Utilisateur introuvable");
      return;
    }

    const total = cartItems.reduce(
      (sum: number, item: CartItem) => sum + item.price * item.quantity,
      0
    );

    try {
      await prisma.order.create({
        data: {
          userId: user.id,
          totalprice: total,
          orderItems: {
            create: cartItems.map((item) => ({
              productId: item.id,
              productPrice: item.price,
              productQty: item.quantity,
              price: item.price * item.quantity,
            })),
          },
        },
      });
    } catch (err) {
      console.error("Erreur création commande :", err);
      res.status(500).send("Erreur enregistrement commande");
      return;
    }
  }

  res.json({ received: true });
};
