import path from 'path';
import express from 'express';
import {
	getAllUserMedications,
	getOneMedication,
	getMedicationImg,
	postUserMedication,
	validateMedication,
} from '../controllers/medication-controller.js';
import { fileURLToPath } from 'url';

const medicationRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

medicationRouter.route(
	'/images',
	express.static(path.join(__dirname, 'public/images'))
);

medicationRouter
	.route('/:userId')
	.get(getAllUserMedications)
	.post(validateMedication, postUserMedication);

medicationRouter.route('/photo/:medicationName').get(getMedicationImg);

medicationRouter.route('/:userId/:medicationName').get(getOneMedication);

export default medicationRouter;
