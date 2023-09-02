import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	fullName: {type: String, require: true},
	email: {type: String, require: true, unique: true},
	password: {type: String, require: true}
});

export const userModel = model('user', userSchema);