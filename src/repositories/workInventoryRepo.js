const Work = require('../models/inventoryWorkModel');
const Type = require('../models/inventoryTypeModel');
const Product = require('../models/inventoryProductModel');
const AppError = require('../utils/appError');
const mongoose = require('mongoose');

const createWork = async (workData) => {
    const work = await Work.create(workData);
    if (!work) {
        throw new AppError("Failed to create work", 400);
    }
    return work;
};

const updateWork = async (id, workData) => {
    try {
        if (!mongoose.works.ObjectId.isValid(id)) {
            throw new AppError("Invalid ID", 400);
        }
        const work = await Work.findByIdAndUpdate(id, workData, { new: true });
        if (!work) {
            throw new AppError("work not found", 400);
        }
        return work;
    } catch (error) {
        throw new AppError("Failed to update work", 400, error);
    }
};

const deleteWork = async (id) => {
    const work = await Work.findByIdAndUpdate(
        id,
        { $set: { isDeleted: true, status: "inactive" } },
        { new: true }
    );

    if (!work) {
        throw new AppError("work not found", 404);
    }

    return work;
};

const getAllWorks = async () => {
    return await Work.find().sort({ updatedAt: -1 });
};

const getWorkById = async (id) => {
  const work = await Work.findById(id);
  if (!work) {
    throw new AppError("Work not found", 400);
  }

  // Fetch related product and type
  const [product, type] = await Promise.all([
    Product.findById(work.productId).select("productName"),
    Type.findById(work.typeId).select("typeName")
  ]);

  // Merge the names into the response
  return {
    ...work.toObject(),
    productName: product?.productName || "Unknown Product",
    typeName: type?.typeName || "Unknown Type"
  };
};

const getWorkByProductId = async (productId) => {
    const workData = await Work.aggregate([
        {
            $match: { productId: productId }, // Filter work records by productId
        },
        {
            $addFields: {
                typeIdObj: { $toObjectId: "$typeId" } // Convert typeId to ObjectId for lookup
            }
        },
        {
            $lookup: {
                from: "types", // Name of the Type collection in MongoDB
                localField: "typeIdObj", // Converted typeId field
                foreignField: "_id", // Field in Type collection
                as: "typeDetails", // Output array containing matching Type documents
            },
        },
        {
            $unwind: {
                path: "$typeDetails",
                preserveNullAndEmptyArrays: true, // Keeps works even if type is missing
            },
        },
        {
            $project: {
                _id: 1,
                productId: 1,
                workName: 1,
                typeId: 1,
                typeName: "$typeDetails.typeName", // Extracting type name
                rent: 1,
                advance: 1,
                createdAt: 1,
                updatedAt: 1,
            },
        },
    ]);

    if (!workData) {
        throw new AppError("No Work Found", 404);
    }

    return workData;
};



const getAllWorksByProductAndTypeId = async (productId,typeId) => {
    const work = await Work.find({productId,typeId});
    if (!work) {
        throw new AppError("work not found", 400);
    }
    return work;
};

const getWorkByName = async (name) => {
    const work = await Work.findOne({ workName: name });
    return work;
};

module.exports = {
    createWork,
    updateWork,
    deleteWork,
    getAllWorks,
    getWorkById,
    getWorkByName,
    getWorkByProductId,
    getAllWorksByProductAndTypeId
};
