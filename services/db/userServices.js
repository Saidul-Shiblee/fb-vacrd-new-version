import userModel from "../../models/userSchema";
export const insertUser = async (userObject) => {
  const user = userModel(userObject);
  const createdUser = await user.save();
  return createdUser;
};
// //Get a single user
export const findUser = async (filter) => {
  const foundUser = await userModel.findOne(filter).lean().exec();
  return foundUser;
};
// //Get a single user to save further change on that record
export const findUserToSave = async (filter) => {
  const foundUser = await userModel.findOne(filter).exec();
  return foundUser;
};
// //Get all users
export const findUsers = async (filter) => {
  const foundUsers = await userModel
    .find(filter)
    .select("-password -__v  -updatedAt ")
    .lean();
  return foundUsers;
};
//Update User
export const findUserAndUpdate = async (id, update) => {
  const updatedUser = await userModel.findOneAndUpdate(id, update, {
    new: true,
  });
  return updatedUser;
};
