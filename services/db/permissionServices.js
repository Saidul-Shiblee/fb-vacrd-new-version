import permissionModel from "../../models/permissonSchema";


export const findPermission = async (filter) => {
    const foundPermission = await permissionModel.findOne(filter).lean().exec();
    return foundPermission;
};

export const findPermissionAndUpdate = async (id, update) => {
    const updatedPermission = await permissionModel.findOneAndUpdate(id, update, {
        new: true,
    });
    return updatedPermission;
};
