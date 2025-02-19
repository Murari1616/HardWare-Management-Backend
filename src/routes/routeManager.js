import express from 'express';
import productRoutes from './productRoutes'
const router = express.Router();
const baseUrl= "/api/v1";
router.use(`${baseUrl}/inventory/product`, productRoutes);

export default router;