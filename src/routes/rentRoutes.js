const express = require('express');
const { createRent, deleteRent, getAllRents, getRentById, updateRent, getAllUnApprovedRents, getAllRentsByName } = require('../controllers/rentController');
const { authenticate } = require('../middleware/authentication');

const router = express.Router(); 

router.post('/createRent',authenticate,createRent);
router.put('/updateRent/:id',authenticate,updateRent);
router.get('/getRentById/:id',authenticate,getRentById);
router.delete('/deleteRent/:id',authenticate,deleteRent);
router.get('/getAllRents',authenticate,getAllRents);
router.get('/getAllUnApprovedRents',authenticate,getAllUnApprovedRents);
router.get('/getAllRentsByName',authenticate,getAllRentsByName);

module.exports=router;
