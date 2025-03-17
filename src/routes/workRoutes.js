const express = require('express');
const { createWork, deleteWork, getAllWorks, getWorkById, updateWork,getAllWorksByProductAndTypeId,getWorkByProductId } = require('../controllers/inventoryWorkController');

const router = express.Router(); 

router.post('/createWork',createWork);
router.put('/updateWork/:id',updateWork);
router.get('/getWorkById/:id',getWorkById);
router.get('/getAllWorksByProductId/:productId',getWorkByProductId);
router.get('/getAllWorkByProductAndTypeId/:productId/:typeId',getAllWorksByProductAndTypeId);
router.delete('/deleteWork/:id',deleteWork);
router.get('/getAllWorks',getAllWorks);

module.exports=router;
