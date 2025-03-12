import request from "supertest";
import app from "../server";
import { ProductService } from "../services/product.service";

jest.mock("../services/product.service");

describe("Product Controller", () => {
  let productService: jest.Mocked<ProductService>;

  beforeEach(() => {
    productService = new ProductService() as jest.Mocked<ProductService>;
    (app as any).productService = productService; // Injection du mock
  });

  it("should create a product", async () => {
    const mockProduct = {
      id: 6,
      name: "Laptop",
      price: 999.99,
      fournisseur: "Dell",
      categoryId: 1,
      activePromoId: null,
    };

    productService.createProduct.mockResolvedValue(mockProduct);

    const response = await request(app)
      .post("/products/create")
      .send({
        name: "Laptop",
        price: 999.99,
        fournisseur: "Dell",
        categoryId: 1,
        activePromoId: null,
      });

    expect(productService.createProduct).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("product");
    expect(response.body.product).toEqual(mockProduct);
  });

  it("should update a product", async () => {
    const mockUpdatedProduct = {
      id: 6,
      name: "Laptop HP",
      price: 899.99,
      fournisseur: "HP",
      categoryId: 1,
      activePromoId: null,
    };

    productService.updateProduct.mockResolvedValue(mockUpdatedProduct);

    const response = await request(app)
      .put("/products/modify/6")
      .send({ name: "Laptop HP", price: 899.99 });

    expect(productService.updateProduct).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("product");
    expect(response.body.product).toEqual(mockUpdatedProduct);
  });

  it("should delete a product", async () => {
    productService.deleteProduct.mockResolvedValue(true);

    const response = await request(app).delete("/products/delete/6");

    expect(productService.deleteProduct).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(204);
  });
});
