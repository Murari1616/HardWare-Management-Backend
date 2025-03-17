const { 
    createRentService, 
    deleteRentService, 
    getAllRentsService, 
    getRentByIdService, 
    updateRentService ,
    getAllRentsByProductAndTypeIdService
} = require('../services/rentService');

const catchAsync = require('../utils/catchAsync');
const { sendSuccessResponse } = require('../utils/response');

const createRent = catchAsync(async (req, res) => {
    const rents = await createRentService(req.body);
    sendSuccessResponse(res, rents, 201, "Rent created successfully");
});

const updateRent = catchAsync(async (req, res) => {
    const rents = await updateRentService(req.params.id, req.body);
    sendSuccessResponse(res, rents, 200, "Rent updated successfully");
});

const deleteRent = catchAsync(async (req, res) => {
    const rents = await deleteRentService(req.params.id);
    sendSuccessResponse(res, rents, 200, "Rent deleted successfully");
});

const getAllRents = catchAsync(async (_req, res) => {
    const rents = await getAllRentsService();
    sendSuccessResponse(res, rents, 200, "Rents fetched successfully");
});

const getRentById = catchAsync(async (req, res) => {
    const rents = await getRentByIdService(req.params.id);
    sendSuccessResponse(res, rents, 200, "Rent fetched successfully");    
});


module.exports = {
    createRent,
    updateRent,
    deleteRent,
    getAllRents,
    getRentById,
};
