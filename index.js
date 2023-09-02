import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { router } from './router/index.js';
import { validationErrors } from './middlewares/validationErrors.middleware.js';

dotenv.config();

const PORT = process.env.PORT || 1337;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(validationErrors);

const start = async () => {
	try {
		await mongoose.connect(process.env.BD_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.listen(PORT, () => console.log(`PORT=${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
