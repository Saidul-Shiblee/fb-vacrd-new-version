import mongoose from "mongoose";

export const permissionSchema = new mongoose.Schema(
    {
        cardGeneration: {
            type: Number,
            default: 3,
        },
        rewrite: {
            type: Number,
            default: 1,
        },
        productNameGeneration: {
            type: Number,
            default: 1,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Permissions || mongoose.model("Permissions", permissionSchema);
