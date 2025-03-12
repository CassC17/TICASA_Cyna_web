import express from "express";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
