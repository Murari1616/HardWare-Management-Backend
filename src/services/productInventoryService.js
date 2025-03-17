const { updateProduct, createProduct, deleteProduct, getAllProducts, getProductById, getProductByName } = require('../repositories/productInventoryRepo');
const AppError = require('../utils/appError');

const createProductService = async (productData) => {
    const { productName } = productData;
    const productExist = await getProductByName(productName);
    if (productExist) {
        throw new AppError("Product already exists", 404);
    }
    return await createProduct(productData);
};

const updateProductService = async (id, productData) => {
    const updatedProduct = await updateProduct(id, productData);
    if (!updatedProduct) {
        throw new AppError("Failed to update product", 400);
    }
    return updatedProduct;
};

const deleteProductService = async (id) => {
    await deleteProduct(id);
    return getAllProducts();
};

const getAllProductsService = async () => {
    return await getAllProducts();
};

const getProductByIdService = async (id) => {
    const productData = await getProductById(id);
    if (!productData) {
        throw new AppError("Product not found", 404);
    }
    return productData;
};

module.exports = {
    createProductService,
    updateProductService,
    deleteProductService,
    getAllProductsService,
    getProductByIdService
};
