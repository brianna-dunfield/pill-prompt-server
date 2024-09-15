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
    const imgPath = path.join(__dirname, '../public/images', `${medicationImgPath}`);
	if (medicationImgPath) {
		res.sendFile(imgPath);
	} else {
		res.status(404).send(
			`No image found for medication: ${req.params.medicationName}`
		);
	}
}

async function postUserMedication(req, res) {
    console.log("BODY", req.body);
	const newMedication = req.body;
    const userId = req.params.userId;
	const newMedicationObj = await createUserMedication(newMedication, userId);
	res.status(200).json(newMedicationObj);
}

function validateMedication(req, res, next) {
    console.log("REQ BODY", req.body);
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
