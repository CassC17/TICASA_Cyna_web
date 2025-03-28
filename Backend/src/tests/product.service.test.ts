import { ProductService } from "../services/product.service";
import { ProductRepository } from "../repositories/product.repository";
import { ProductDTO } from "../types/product/product.dto";

jest.mock("../repositories/product.repository");

describe("ProductService", () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = new ProductRepository() as jest.Mocked<ProductRepository>;
    productService = new ProductService();
    (productService as any).productRepository = productRepository; // Injecte le mock
  });

  it("should create a product", async () => {
    const mockProduct = new ProductDTO(1, "Laptop", 999.99, "Dell", "Dell Laptop", "test", 1, null);

    productRepository.createProduct.mockResolvedValue(mockProduct);

    const result = await productService.createProduct(
      "Laptop",
      999.99,
      "Dell",
      "Dell Laptop",
      "test",
      1,
      null
    );

    expect(result).toEqual(mockProduct);
    expect(productRepository.createProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.createProduct).toHaveBeenCalledWith(
      "Laptop",
      999.99,
      "Dell",
      1,
      null
    );
  });

  it("should update a product", async () => {
    const mockUpdatedProduct = new ProductDTO(1, "Laptop HP", 899.99, "HP", "Dell Laptop", "test", 1, null);

    productRepository.updateProduct.mockResolvedValue(mockUpdatedProduct);

    const result = await productService.updateProduct(1, { name: "Laptop HP", price: 899.99 });

    expect(result).toEqual(mockUpdatedProduct);
    expect(productRepository.updateProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.updateProduct).toHaveBeenCalledWith(1, { name: "Laptop HP", price: 899.99 });
  });

  it("should delete a product", async () => {
    productRepository.deleteProduct.mockResolvedValue(true);

    const result = await productService.deleteProduct(1);

    expect(result).toBe(true);
    expect(productRepository.deleteProduct).toHaveBeenCalledTimes(1);
    expect(productRepository.deleteProduct).toHaveBeenCalledWith(1);
  });
});
