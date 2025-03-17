const { updateType, createType, deleteType, getAllTypes, getTypeById, getTypeByName,getAllTypesByProductId } = require('../repositories/typeInventoryRepo');
const AppError = require('../utils/appError');

const createTypeService = async (typeData) => {
    const { typeName } = typeData;
    const typeExist = await getTypeByName(typeName);
    if (typeExist) {
        throw new AppError("Type already exists", 404);
    }
    return await createType(typeData);
};

const updateTypeService = async (id, typeData) => {
    const updatedType = await updateType(id, typeData);
    if (!updatedType) {
        throw new AppError("Failed to update type", 400);
    }
    return updatedType;
};

const deleteTypeService = async (id) => {
    await deleteType(id);
    return getAllTypes();
};

const getAllTypesService = async () => {
    return await getAllTypes();
};

const getTypeByIdService = async (id) => {
    const typeData = await getTypeById(id);
    if (!typeData) {
        throw new AppError("Type not found", 404);
    }
    return typeData;
};

const getAllTypesByProductIdService = async (productId) => {
    const typeData = await getAllTypesByProductId(productId);
    if (!typeData) {
        throw new AppError("Type not found", 404);
    }
    return typeData;
};

module.exports = {
    createTypeService,
    updateTypeService,
    deleteTypeService,
    getAllTypesService,
    getAllTypesByProductIdService,
    getTypeByIdService
};
