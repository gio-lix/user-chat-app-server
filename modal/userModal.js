import mongoose from "mongoose";

const userModal = new mongoose.Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 4,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

export default mongoose.model("Users", userModal)