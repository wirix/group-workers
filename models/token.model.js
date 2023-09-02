import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	refreshToken: { type: String, require: true }
});

export const tokenModel = model('token', tokenSchema);