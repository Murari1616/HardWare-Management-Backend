const { createUserController,
  loginUser,
  getAllUsersController,
  getUserByIdController, }=require('../controllers/userController');
const express = require('express');
const { authenticate } = require('../middleware/authentication');
const router = express.Router();

//User Authentication and Authorization
router.post('/register',createUserController);
router.post('/login', loginUser);
router.get('getUserById/:id', getUserByIdController);
router.get('/getAllUsers',authenticate, getAllUsersController);

module.exports=router;
