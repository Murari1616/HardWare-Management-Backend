const { 
    createTypeService, 
    deleteTypeService, 
    getAllTypesService, 
    getTypeByIdService, 
    updateTypeService ,
    getAllTypesByProductIdService
} = require('../services/typeInventoryService');

const catchAsync = require('../utils/catchAsync');
const { sendSuccessResponse } = require('../utils/response');

const createType = catchAsync(async (req, res) => {
    const types = await createTypeService(req.body);
    sendSuccessResponse(res, types, 201, "Type created successfully");
});

const updateType = catchAsync(async (req, res) => {
    const types = await updateTypeService(req.params.id, req.body);
    sendSuccessResponse(res, types, 200, "Type updated successfully");
});

const deleteType = catchAsync(async (req, res) => {
    const types = await deleteTypeService(req.params.id);
    sendSuccessResponse(res, types, 200, "Type deleted successfully");
});

const getAllTypes = catchAsync(async (_req, res) => {
    const types = await getAllTypesService();
    sendSuccessResponse(res, types, 200, "Types fetched successfully");
});

const getTypeById = catchAsync(async (req, res) => {
    const type = await getTypeByIdService(req.params.id);
    sendSuccessResponse(res, type, 200, "Type fetched successfully");    
});

const getAllTypesByProductId = catchAsync(async (req, res) => {
    const type = await getAllTypesByProductIdService(req.params.productId);
    sendSuccessResponse(res, type, 200, "Types fetched successfully");    
});

module.exports = {
    createType,
    updateType,
    deleteType,
    getAllTypes,
    getTypeById,
    getAllTypesByProductId
};
