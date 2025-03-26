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

// const getAllRents = catchAsync(async (_req, res) => {
//     const rents = await getAllRentsService();
//     sendSuccessResponse(res, rents, 200, "Rents fetched successfully");
// });

const getAllRents = catchAsync(async (req, res) => {
    const page = Number(req.query.page) || 1; // Default page to 1
    const limit = Number(req.query.limit) || 10; // Default limit to 10
    const search = req.query.search ? req.query.search.trim() : undefined;
    const date = req.query.date ? req.query.date.trim() : undefined; // Separate date parameter
    const days = req.query.days ? Number(req.query.days) : undefined; // Separate date parameter

    const rents = await getAllRentsService(page, limit, search, date,days);
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
