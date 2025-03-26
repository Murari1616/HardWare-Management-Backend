const { updateRent, createRent, deleteRent, getAllRents, getRentById, getRentByName,getAllRentsByProductAndTypeId } = require('../repositories/rentRepo');
const AppError = require('../utils/appError');

const createRentService = async (rentData) => {
    // const rentExist = await getRentByName(rentName);
    // if (rentExist) {
    //     throw new AppError("Rent already exists", 404);
    // }
    return await createRent(rentData);
};

const updateRentService = async (id, rentData) => {
    console.log("ID",id)
    const updatedrent = await updateRent(id, rentData);
    if (!updatedrent) {
        throw new AppError("Failed to update rent", 400);
    }
    return updatedrent;
};

const deleteRentService = async (id) => {
    await deleteRent(id);
};

// const getAllRentsService = async () => {
//     return await getAllRents();
// };

const getAllRentsService = async (page, limit, search, date,days) => {
    return await getAllRents(page, limit, search, date,days);
};



const getRentByIdService = async (id) => {
    const rentData = await getRentById(id);
    if (!rentData) {
        throw new AppError("Rent not found", 404);
    }
    return rentData;
};

module.exports = {
    createRentService,
    updateRentService,
    deleteRentService,
    getAllRentsService,
    getRentByIdService,
};
