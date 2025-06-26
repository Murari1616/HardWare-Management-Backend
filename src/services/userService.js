const AppError = require("../utils/appError");
const userRepo = require("../repositories/userRepo");
const { comparePassword, hashPassword } = require("../utils/crypto");
const { generateToken } = require("../middleware/authentication");

// Create user
async function createUser(userData) {
  const{name,password,email,phoneNumber,address,AadharNo}=userData;
  try {
    if (!email || !password) {
      throw new AppError("Email, and password are required", 400);
    }

    const existingUser = await userRepo.getUserByEmail(email);
    if (existingUser) {
      throw new AppError("Email already exists", 409);
    }

    const hashed = await hashPassword(password);

    const user = await userRepo.createUser({
      email,
      password: hashed,
      name,
      phoneNumber,
      address,
      AadharNo
    });

    return {
      data:{
      _id: user._id,
      email: user.email,
    owner:user.owner}
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to create user", 500, error);
  }
}

// Login
async function login(email, password) {
  try {
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await userRepo.getUserByEmail(email);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = generateToken(user._id,user.email);
    return {
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        owner:user.owner,
        phoneNumber:user.phoneNumber,
        address:user.address,
      },
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to login", 500, error);
  }
}

// Get user by ID
async function getUser(userId) {
  try {
    if (!userId) throw new AppError("User ID is required", 400);

    const user = await userRepo.getUserById(userId);
    if (!user) throw new AppError("User not found", 404);

    return {
      _id: user._id,
      email: user.email,
      name:user.name
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to fetch user", 500, error);
  }
}

// Get all users
async function getAllUsers() {
  try {
    const users = await userRepo.getAllUsers();
    return users.map(user => ({
      _id: user._id,
      email: user.email,
      name:user.name
    }));
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Failed to fetch users", 500, error);
  }
}

module.exports = {
  createUser,
  login,
  getUser,
  getAllUsers,
};
