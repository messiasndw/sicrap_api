import mongoose from '../database.js'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt:{
        type: Date,
        select: false
    },
    updatedAt:{
        type: Date,
        select: false
    },
    gender: String,
    birthday: Date
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User