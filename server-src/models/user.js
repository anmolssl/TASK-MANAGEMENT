import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    firstname: String,
    lastname: String,
    profilepic: String,
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
});

userSchema.methods.comparePassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

const User = mongoose.model("User", userSchema);

export default User;