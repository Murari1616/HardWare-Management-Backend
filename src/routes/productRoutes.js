const express = require('express');
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require('../controllers/inventoryProductController');

const router = express.Router(); 

router.post('/createProduct',createProduct);
router.put('/updateProduct/:id',updateProduct);
router.get('/getProductById/:id',getProductById);
router.delete('/deleteProduct/:id',deleteProduct);
router.get('/getAllProducts',getAllProducts);

module.exports=router;
