// productService.ts
import { updateProduct,createProduct, deleteProduct, getAllProducts, getProductById, getProductByName } from '../repositories/productInventoryRepo';
import * as productRepo from '../repository/productRepository';
import AppError from '../utils/appError';
export const createProductService = async (productData) => {
    const {productName}=productData;
    const productExist=await getProductByName(productName)
    if(productExist){
        throw new AppError("Product already exists",404);
    }
   const product = await createProduct(productData);

    return product;
};

 export const updateProductService = async (id, productData)=> {
        const updatedProduct  =     await updateProduct(id, productData);
        if (!updatedProduct) {
            throw new AppError("Failed to update product", 400);
        }
        return updatedProduct;
    };

export const deleteProductService = async (id)=> {
    await deleteProduct(id);
    return productRepo.getAllProducts();
};

export const getAllProductsService = async () => {
    return await getAllProducts();
};

export const getProductByIdService = async (id) => {
    const productData  =  await getProductById(id);
    if(!productData) {
        throw new AppError("Product not found", 404);
        }

    return productData;;
};

