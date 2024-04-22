import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email can't be left blank"],
      unique: true,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, "Password can't be left blank"],
    },
    fullName: {
      type: String,
      required: [true, "Full Name can't be left blank"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    cardGenerated: {
      type: Number,
      default: 0,
    },
    rewrite: {
      type: Number,
      default: 0,
    },
    productNameGenerated: {
      type: Number,
      default: 0,
    },
    currentPlan: {
      type: String
    },
    hostedCardDetails: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", userSchema);
