const express = require('express');
const { createWork, deleteWork, getAllWorks, getWorkById, updateWork,getAllWorksByProductAndTypeId,getWorkByProductId } = require('../controllers/inventoryWorkController');
const { authenticate } = require('../middleware/authentication');

const router = express.Router(); 

router.post('/createWork',authenticate,createWork);
router.put('/updateWork/:id',authenticate,updateWork);
router.get('/getWorkById/:id',authenticate,getWorkById);
router.get('/getAllWorksByProductId/:productId',authenticate,getWorkByProductId);
router.get('/getAllWorkByProductAndTypeId/:productId/:typeId',authenticate,getAllWorksByProductAndTypeId);
router.delete('/deleteWork/:id',authenticate,deleteWork);
router.get('/getAllWorks',authenticate,getAllWorks);

module.exports=router;
