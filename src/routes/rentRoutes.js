const express = require('express');
const { createRent, deleteRent, getAllRents, getRentById, updateRent } = require('../controllers/rentController');

const router = express.Router(); 

router.post('/createRent',createRent);
router.put('/updateRent/:id',updateRent);
router.get('/getRentById/:id',getRentById);
router.delete('/deleteRent/:id',deleteRent);
router.get('/getAllRents',getAllRents);

module.exports=router;
