// productController.ts
import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, updateProductService } from '../services/productInventoryService';
import catchAsync from '../utils/catchAsync';
import { sendSuccessResponse } from '../utils/response';

export const createProduct = catchAsync(async (req, res) => {
    const products = await createProductService(req.body);
    sendSuccessResponse(res, products, 201, "Product created successfully");
});

export const updateProduct = catchAsync(async (req, res) => {
    const products = await updateProductService(req.params.id, req.body);
    sendSuccessResponse(res, products, 200, "Product updated successfully");
});

export const deleteProduct = catchAsync(async (req, res) => {
    const products = await deleteProductService(req.params.id);
    sendSuccessResponse(res, products, 200, "Product deleted successfully");
});

export const getAllProducts = catchAsync(async (_req, res) => {
    const products = await getAllProductsService();
    sendSuccessResponse(res, products, 200, "Products fetched successfully");
});

export const getProductById = catchAsync(async (req, res) => {
    const product = await getProductByIdService(req.params.id);
    sendSuccessResponse(res, product, 200, "Product fetched successfully");    
});
