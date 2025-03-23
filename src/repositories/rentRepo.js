const Rent = require('../models/rentModel');
const Product = require('../models/inventoryProductModel');
const Type = require('../models/inventoryTypeModel');
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
        if (!mongoose.Types.ObjectId.isValid(id)) { // Fix applied here
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

// const getAllRents = async () => {
//     const rents = await Rent.find().sort({ updatedAt: -1 });

//     // Fetch productName and typeName for each rent record
//     const rentsWithDetails = await Promise.all(
//         rents.map(async (rent) => {
//             const product = await Product.findById(rent.productId).select('productName');
//             const type = await Type.findById(rent.typeId).select('typeName');

//             return {
//                 ...rent.toObject(),
//                 productName: product ? product.productName : "Unknown Product",
//                 typeName: type ? type.typeName : "Unknown Type"
//             };
//         })
//     );

//     return rentsWithDetails;
// };


const getAllRents = async (page, limit, search, date) => {
    const offset = (page - 1) * limit;
    const query = {};

    // Search by customerName or referenceName (case-insensitive)
    if (search) {
        query.$or = [
            { customerName: { $regex: search, $options: "i" } },
            { referenceName: { $regex: search, $options: "i" } }
        ];
    }

    // Search by date (exact match)
    if (date) {
        query.date = date; // Assuming date is stored as 'YYYY-MM-DD'
    }

    // Fetch rents with pagination and sorting
    const rents = await Rent.find(query)
        .sort({ createdAt: -1 }) // Sort by createdAt (latest first)
        .skip(offset)
        .limit(limit);

    // Fetch productName and typeName for each rent record
    const rentsWithDetails = await Promise.all(
        rents.map(async (rent) => {
            const product = await Product.findById(rent.productId).select('productName');
            const type = await Type.findById(rent.typeId).select('typeName');

            return {
                ...rent.toObject(),
                productName: product ? product.productName : "Unknown Product",
                typeName: type ? type.typeName : "Unknown Type"
            };
        })
    );

    // Get total count of rents matching the query
    const totalRecords = await Rent.countDocuments(query);

    return {
        totalRecords,
        currentPage: page,
        totalPages: Math.ceil(totalRecords / limit),
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page * limit < totalRecords ? page + 1 : null,
        data: rentsWithDetails,
    };
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
