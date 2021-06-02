import mongoose from '../database.js'

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    birthday: Date
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

export default User