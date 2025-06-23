import { Request, Response, RequestHandler } from 'express';
import { CategoryService } from '../services/category.service';
import { CategoryPresenter } from '../types/category/category.presenter';
import { ProductPresenter } from '../types/product/product.presenter';

export const CategoryController = {
  getAll: (async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    res.json(categories.map(CategoryPresenter.toResponse));
  }) as RequestHandler,

  getById: (async (req, res) => {
    const id = parseInt(req.params.id);
    const category = await CategoryService.getCategoryById(id);
    if (!category) return res.status(404).json({ message: 'Not found' });
    res.json(CategoryPresenter.toResponse(category));
  }) as RequestHandler,

  create: (async (req, res) => {
    const category = await CategoryService.createCategory(req.body);
    res.status(201).json(CategoryPresenter.toResponse(category));
  }) as RequestHandler,

  update: (async (req, res) => {
    const id = parseInt(req.params.id);
    const category = await CategoryService.updateCategory({ id, ...req.body });
    res.json(CategoryPresenter.toResponse(category));
  }) as RequestHandler,

  delete: (async (req, res) => {
    const id = parseInt(req.params.id);
    await CategoryService.deleteCategory(id);
    res.status(204).send();
  }) as RequestHandler,

  getProductsByCategory: (async (req, res) => {
    const id = parseInt(req.params.id);
    const products = await CategoryService.getProductsByCategory(id);
    res.json(products.map(ProductPresenter.toDTO));
  }) as RequestHandler,
};
