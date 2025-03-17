const express = require('express');
const { createType, deleteType, getAllTypes, getTypeById, updateType,getAllTypesByProductId } = require('../controllers/inventoryTypeController');

const router = express.Router(); 

router.post('/createType',createType);
router.put('/updateType/:id',updateType);
router.get('/getTypeById/:id',getTypeById);
router.get('/getAllTypesByProductId/:productId',getAllTypesByProductId);
router.delete('/deleteType/:id',deleteType);
router.get('/getAllTypes',getAllTypes);

module.exports=router;
