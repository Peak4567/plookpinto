import { Router } from 'express';
import { forgotPassword, login, register } from './controllers/authController.js';
import { getPopularProducts } from './controllers/productController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.get('/popular-products', getPopularProducts);

export default router;