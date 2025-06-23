import { Request, Response, RequestHandler } from 'express';
import { PromotionService } from '../services/promotion.service';
import { PromotionPresenter } from '../types/promotion/promotion.presenter';

export const PromotionController = {
  getAll: (async (req, res) => {
    const promotions = await PromotionService.getAllPromotions();
    res.json(promotions.map(PromotionPresenter.toResponse));
  }) as RequestHandler,

  getById: (async (req, res) => {
    const id = parseInt(req.params.id);
    const promotion = await PromotionService.getPromotionById(id);
    if (!promotion) return res.status(404).json({ message: 'Not found' });
    res.json(PromotionPresenter.toResponse(promotion));
  }) as RequestHandler,

  create: (async (req, res) => {
    const promotion = await PromotionService.createPromotion(req.body);
    res.status(201).json(PromotionPresenter.toResponse(promotion));
  }) as RequestHandler,

  update: (async (req, res) => {
    const id = parseInt(req.params.id);
    const promotion = await PromotionService.updatePromotion({ id, ...req.body });
    res.json(PromotionPresenter.toResponse(promotion));
  }) as RequestHandler,

  delete: (async (req, res) => {
    const id = parseInt(req.params.id);
    await PromotionService.deletePromotion(id);
    res.status(204).send();
  }) as RequestHandler
};
