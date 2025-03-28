import express from "express";
import cors from "cors";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import { errorHandler } from "./middleware/errorHandler.middleware";
import categoryRoutes from "./routes/category.routes";

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialisation de Swagger
setupSwagger(app);
app.use(cors({
  origin: 'http://localhost:8081'  
}));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use('/categories', categoryRoutes);
app.use(errorHandler);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});

export default app;
