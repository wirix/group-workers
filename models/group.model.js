import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
	admin: { type: Schema.Types.ObjectId, ref: 'user' },
	headText: { type: String, require: true },
	members: { type: Array, require: false, default: [] }
});

export const groupModel = model('group', groupSchema);