const Type = require('../models/inventoryTypeModel');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

const createType = async (typeData) => {
    const type = await Type.create(typeData);
    if (!type) {
        throw new AppError("Failed to create type", 400);
    }
    return type;
};

const updateType = async (id, typeData) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400);
        }
        const type = await Type.findByIdAndUpdate(id, typeData, { new: true });
        if (!type) {
            throw new AppError("Type not found", 400);
        }
        return type;
    } catch (error) {
        throw new AppError("Failed to update type", 400, error);
    }
};

const deleteType = async (id) => {
    const type = await Type.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true, status: "inactive" } },
        { new: true }
    );

    if (!type) {
        throw new AppError("Type not found", 404);
    }

    return type;
};

const getAllTypes = async () => {
    return await Type.find().sort({ updatedAt: -1 });
};

const getTypeById = async (id) => {
    const type = await Type.findById(id);
    if (!type) {
        throw new AppError("Type not found", 400);
    }
    return type;
};

const getAllTypesByProductId = async (productId) => {
    const type = await Type.find({productId});
    if (!type) {
        throw new AppError("Type not found", 400);
    }
    return type;
};

const getTypeByName = async (name) => {
    const type = await Type.findOne({ typeName: name });
    return type;
};

module.exports = {
    createType,
    updateType,
    deleteType,
    getAllTypes,
    getTypeById,
    getAllTypesByProductId,
    getTypeByName
};
