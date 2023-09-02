import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'user' },
	headText: { type: String, require: true },
	listWorkers: { type: Array, require: false, default: [] }
});

export const groupModel = model('group', groupSchema);