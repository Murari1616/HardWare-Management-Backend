const express = require('express');
const { createRent, deleteRent, getAllRents, getRentById, updateRent, getAllUnApprovedRents, getAllRentsByName } = require('../controllers/rentController');

const router = express.Router(); 

router.post('/createRent',createRent);
router.put('/updateRent/:id',updateRent);
router.get('/getRentById/:id',getRentById);
router.delete('/deleteRent/:id',deleteRent);
router.get('/getAllRents',getAllRents);
router.get('/getAllUnApprovedRents',getAllUnApprovedRents);
router.get('/getAllRentsByName',getAllRentsByName);

module.exports=router;
