const express = require('express');
const { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } = require('../controllers/inventoryProductController');
const { authenticate } = require('../middleware/authentication');

const router = express.Router(); 

router.post('/createProduct',authenticate,createProduct);
router.put('/updateProduct/:id',authenticate,updateProduct);
router.get('/getProductById/:id',authenticate,getProductById);
router.delete('/deleteProduct/:id',authenticate,deleteProduct);
router.get('/getAllProducts',authenticate,getAllProducts);

module.exports=router;
