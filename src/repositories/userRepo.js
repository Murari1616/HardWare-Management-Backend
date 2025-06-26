// src/repository/userRepository.js
const User = require('../models/userModel');
const AppError = require('../utils/appError');

// === Create a new user ===
const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (err) {
    throw new AppError("Failed to create user", 500, err);
  }
};

// === Update user by ID ===
const updateUser = async (id, userData) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
  return updatedUser;
};

// === Soft delete user (set status to inactive) ===
const deleteUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  user.status = 'inactive';
  await user.save();
  return user;
};

// === Get user by ID ===
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return user;
};
// === Get user by email ===
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

// === Get all users ===
const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  getUserByEmail
};
