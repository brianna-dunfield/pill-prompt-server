import {
	getUserMedications,
	getOneUserMedication,
	getMedicationImgPath,
	createUserMedication,
	validateMedicationInput,
} from '../models/medications.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getAllUserMedications(req, res) {
	const userId = req.params.userId;
	console.log('USER ID IN CONTROLLER:', req.params.userId);
	const userMedications = await getUserMedications(userId);

	if (!userMedications) {
		res.status(404).send(
			`Medications for user: ${req.params.userId} not found`
		);
	} else {
		res.json(userMedications);
	}
}

async function getOneMedication(req, res) {
	const userId = req.params.userId;
	const medicationName = req.params.medicationName;
	const userMedication = await getOneUserMedication(userId, medicationName);
	if (userMedication) {
		console.log(userMedication);
		res.json(userMedication);
	} else {
		res.status(404).send(
			`No medication found with the name: ${req.params.medicationName} found for user: ${req.userId}`
		);
	}
}

async function getMedicationImg(req, res) {
	const medicationImgPath = await getMedicationImgPath(req.params.medicationName);
    console.log("MEDICATION IMG PATH", medicationImgPath);
    const imgPath = path.join(__dirname, '../public/images', `${medicationImgPath}`);
    console.log(imgPath);
	if (medicationImgPath) {
		res.sendFile(imgPath);
	} else {
		res.status(404).send(
			`No image found for medication: ${req.params.medicationName}`
		);
	}
}

function postUserMedication(req, res) {
	const newMedication = req.body;
	const newMedicationObj = createUserMedication(newMedication);
	res.send('New medication created: ', newMedicationObj);
}

function validateMedication(req, res, next) {
	const medicationInputValidation = validateMedicationInput(req.body);
	if (medicationInputValidation) {
		next();
	} else {
		res.status(400).send('Must input valid data.');
	}
}

export {
	getAllUserMedications,
	getOneMedication,
	getMedicationImg,
	postUserMedication,
	validateMedication,
};
