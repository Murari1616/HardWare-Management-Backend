const Rent = require('../models/rentModel');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

const createRent = async (rentData) => {
    const rent = await Rent.create(rentData);
    if (!rent) {
        throw new AppError("Failed to create rent", 400);
    }
    return rent;
};

const updateRent = async (id, rentData) => {
    try {
        if (!mongoose.rents.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400);
        }
        const rent = await Rent.findByIdAndUpdate(id, rentData, { new: true });
        if (!rent) {
            throw new AppError("rent not found", 400);
        }
        return rent;
    } catch (error) {
        throw new AppError("Failed to update rent", 400, error);
    }
};

const deleteRent = async (id) => {
    const rent = await Rent.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true, status: "inactive" } },
        { new: true }
    );

    if (!rent) {
        throw new AppError("rent not found", 404);
    }

    return rent;
};

const getAllRents = async () => {
    return await Rent.find().sort({ updatedAt: -1 });
};

const getRentById = async (id) => {
    const rent = await Rent.findById(id);
    if (!rent) {
        throw new AppError("rent not found", 400);
    }
    return rent;
};

const getRentByName = async (name) => {
    const rent = await Rent.findOne({ rentName: name });
    return rent;
};

module.exports = {
    createRent,
    updateRent,
    deleteRent,
    getAllRents,
    getRentById,
    getRentByName,
};
