const { updateWork, createWork, deleteWork, getAllWorks, getWorkById, getWorkByName,getWorkByProductId,getAllWorksByProductAndTypeId } = require('../repositories/workInventoryRepo');
const AppError = require('../utils/appError');

const createWorkService = async (workData) => {
    const { workName } = workData;
    const workExist = await getWorkByName(workName);
    if (workExist) {
        throw new AppError("Work already exists", 404);
    }
    return await createWork(workData);
};

const updateWorkService = async (id, workData) => {
    const updatedwork = await updateWork(id, workData);
    if (!updatedwork) {
        throw new AppError("Failed to update work", 400);
    }
    return updatedwork;
};

const deleteWorkService = async (id) => {
    await deleteWork(id);
    return getAllWorks();
};

const getAllWorksService = async () => {
    return await getAllWorks();
};

const getWorkByIdService = async (id) => {
    const workData = await getWorkById(id);
    if (!workData) {
        throw new AppError("Work not found", 404);
    }
    return workData;
};

const getWorkByProductIdService = async (productId) => {
    const workData = await getWorkByProductId(productId);
    if (!workData) {
        throw new AppError("Work not found", 404);
    }
    return workData;
};

const getAllWorksByProductAndTypeIdService = async (productId,typeId) => {
    const workData = await getAllWorksByProductAndTypeId(productId,typeId);
    if (!workData) {
        throw new AppError("Work not found", 404);
    }
    return workData;
};

module.exports = {
    createWorkService,
    updateWorkService,
    deleteWorkService,
    getAllWorksService,
    getWorkByIdService,
    getWorkByProductIdService,
    getAllWorksByProductAndTypeIdService
};
