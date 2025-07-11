import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';

const router = Router();

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getById);
router.post('/', CategoryController.create);
router.put('/:id', CategoryController.update);
router.delete('/:id', CategoryController.delete);
router.get('/:id/products', CategoryController.getProductsByCategory);

export default router;
