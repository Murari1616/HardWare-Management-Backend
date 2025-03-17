const Product = require('../models/inventoryProductModel');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

const createProduct = async (productData) => {
    const product = await Product.create(productData);
    if (!product) {
        throw new AppError("Failed to create product", 400);
    }
    return product;
};

const updateProduct = async (id, productData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400);
        }
        const product = await Product.findByIdAndUpdate(id, productData, { new: true });
        if (!product) {
            throw new AppError("Product not found", 400);
        }
        return product;
    } catch (error) {
        throw new AppError("Failed to update product", 400, error);
    }
};

const deleteProduct = async (id) => {
    const product = await Product.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true, status: "inactive" } },
        { new: true }
    );

    if (!product) {
        throw new AppError("Product not found", 404);
    }

    return product;
};

const getAllProducts = async () => {
    return await Product.find().sort({ updatedAt: -1 });
};

const getProductById = async (id) => {
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 400);
    }
    return product;
};

const getProductByName = async (name) => {
    const product = await Product.findOne({ productName: name });
    return product;
};

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    getProductByName
};
