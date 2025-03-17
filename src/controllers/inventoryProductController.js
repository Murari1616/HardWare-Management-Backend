const { 
    createProductService, 
    deleteProductService, 
    getAllProductsService, 
    getProductByIdService, 
    updateProductService 
} = require('../services/productInventoryService');

const catchAsync = require('../utils/catchAsync');
const { sendSuccessResponse } = require('../utils/response');

const createProduct = catchAsync(async (req, res) => {
    const products = await createProductService(req.body);
    sendSuccessResponse(res, products, 201, "Product created successfully");
});

const updateProduct = catchAsync(async (req, res) => {
    const products = await updateProductService(req.params.id, req.body);
    sendSuccessResponse(res, products, 200, "Product updated successfully");
});

const deleteProduct = catchAsync(async (req, res) => {
    const products = await deleteProductService(req.params.id);
    sendSuccessResponse(res, products, 200, "Product deleted successfully");
});

const getAllProducts = catchAsync(async (_req, res) => {
    const products = await getAllProductsService();
    sendSuccessResponse(res, products, 200, "Products fetched successfully");
});

const getProductById = catchAsync(async (req, res) => {
    const product = await getProductByIdService(req.params.id);
    sendSuccessResponse(res, product, 200, "Product fetched successfully");    
});

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getProductById
};
