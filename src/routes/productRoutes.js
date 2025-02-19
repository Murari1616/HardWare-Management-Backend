import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/inventoryProductController';
const router = Router();

router.post('/createProduct',createProduct);
router.update('/updateProduct/:id',updateProduct);
router.get('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',deleteProduct);
router.get('/getAllProducts',getAllProducts);

export default router;
