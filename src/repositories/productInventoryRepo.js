// productRepository.ts
import Product from '../models/inventoryProductModel';
import AppError from '../utils/appError';
import mongoose from 'mongoose';

export const createProduct = async (productData)=> {
    const product = await Product.create(productData);
    if (!product) {
        throw new AppError("Failed to create product", 400);
    }
    return product;
};

export const updateProduct = async (id, productData) => {
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
   
    throw new AppError("Failed to update product", 400,error);
   }
};

export const deleteProduct = async (id) => {
    // Find the product by ID and update the 'isDeleted' flag to true and status to false
    const product = await Product.findByIdAndUpdate(
      id, 
      { 
        $set: { isDeleted: true, status: "inactive" } 
      }, 
      { new: true } // Ensure that the updated document is returned
    );
  
    // If no product is found, throw an error
    if (!product) {
      throw new AppError("Product not found", 404);
    }
  
    // Return the updated product
    return product;
  };

export const getAllProducts = async ()=> {
    return await Product.find().sort({ updatedAt: -1 });
};

export const getProductById = async (id) => {
   
    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 400);
    }
    return product;
}

export const getProductByName = async (name) => {
    const product = await Product.findOne({ productName: name });
    if (!product) {
        throw new AppError("Product not found", 400);
    }
    return product;
};