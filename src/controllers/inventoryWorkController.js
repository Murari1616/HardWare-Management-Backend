const { 
    createWorkService, 
    deleteWorkService, 
    getAllWorksService, 
    getWorkByIdService, 
    updateWorkService ,
    getWorkByProductIdService,
    getAllWorksByProductAndTypeIdService
} = require('../services/workInventoryService');
const dotenv = require('dotenv');

dotenv.config();

const catchAsync = require('../utils/catchAsync');
const { sendSuccessResponse } = require('../utils/response');

const createWork = catchAsync(async (req, res) => {
    const owner = process.env.ownerId;
    if (req.user.id != owner) {
        throw new AppError("Unauthorised", 401);
    }
    const works = await createWorkService(req.body);
    sendSuccessResponse(res, works, 201, "Work created successfully");
});

const updateWork = catchAsync(async (req, res) => {
    const owner = process.env.ownerId;
    if (req.user.id != owner) {
        throw new AppError("Unauthorised", 401);
    }
    const works = await updateWorkService(req.params.id, req.body);
    sendSuccessResponse(res, works, 200, "Work updated successfully");
});

const deleteWork = catchAsync(async (req, res) => {
    const owner = process.env.ownerId;
    if (req.user.id != owner) {
        throw new AppError("Unauthorised", 401);
    }
    const works = await deleteWorkService(req.params.id);
    sendSuccessResponse(res, works, 200, "Work deleted successfully");
});

const getAllWorks = catchAsync(async (_req, res) => {
    const works = await getAllWorksService();
    sendSuccessResponse(res, works, 200, "Works fetched successfully");
});

const getWorkById = catchAsync(async (req, res) => {
    const works = await getWorkByIdService(req.params.id);
    sendSuccessResponse(res, works, 200, "Work fetched successfully");    
});

const getWorkByProductId = catchAsync(async (req, res) => {
    const works = await getWorkByProductIdService(req.params.productId);
    sendSuccessResponse(res, works, 200, "Work fetched successfully");    
});

const getAllWorksByProductAndTypeId = catchAsync(async (req, res) => {
    const {productId,typeId}=req.params;
    const works = await getAllWorksByProductAndTypeIdService(productId,typeId);
    sendSuccessResponse(res, works, 200, "Works fetched successfully");    
});

module.exports = {
    createWork,
    updateWork,
    deleteWork,
    getAllWorks,
    getWorkById,
    getWorkByProductId,
    getAllWorksByProductAndTypeId
};
