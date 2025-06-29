const express = require('express');
const { createType, deleteType, getAllTypes, getTypeById, updateType,getAllTypesByProductId } = require('../controllers/inventoryTypeController');
const { authenticate } = require('../middleware/authentication');

const router = express.Router(); 

router.post('/createType',authenticate,createType);
router.put('/updateType/:id',authenticate,updateType);
router.get('/getTypeById/:id',authenticate,getTypeById);
router.get('/getAllTypesByProductId/:productId',authenticate,getAllTypesByProductId);
router.delete('/deleteType/:id',authenticate,deleteType);
router.get('/getAllTypes',authenticate,getAllTypes);

module.exports=router;
