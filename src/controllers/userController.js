const {
  login, createUser, getUser, getAllUsers
} = require('../services/userService');
const dotenv = require('dotenv');
dotenv.config();

const catchAsync = require('../utils/catchAsync');
const { sendSuccessResponse } = require('../utils/response');

const createUserController = catchAsync(async (req, res) => {
  const user = await createUser(req.body);
  sendSuccessResponse(res, user, 201, 'User created successfully');
});

const loginUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await login(email, password);
  sendSuccessResponse(res, user, 200, 'Login successful');
});

const getAllUsersController = catchAsync(async (req, res) => {
  const owner = process.env.ownerId;
  if (req.user.id != owner) {
    throw new AppError("Unauthorised", 401);
  }
  const users = await getAllUsers();
  sendSuccessResponse(res, users, 200, 'Users fetched successfully');
});

const getUserByIdController = catchAsync(async (req, res) => {
  const user = await getUser(req.params.id);
  sendSuccessResponse(res, user, 200, 'User fetched successfully');
});

module.exports = {
  createUserController,
  loginUser,
  getAllUsersController,
  getUserByIdController,
};
