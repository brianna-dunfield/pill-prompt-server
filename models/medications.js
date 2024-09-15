import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig);

export async function getUserMedications(userId) {
	try {
		const medicationsList = await db('user_medication')
			.where({ user_id: userId })
			.select('*');
		return medicationsList;
	} catch (error) {
		return console.error(error);
	}
}

export async function getOneUserMedication(userId, medicationName) {
	try {
		const medicationInfo = await db('user_medication')
			.where({ user_id: userId })
			.where({ medication_name: medicationName })
            .select('*')
			.first();
		return medicationInfo;
	} catch (error) {
		return console.error(error);
	}
}

export async function getMedicationImgPath(medicationName) {
	try {
		const medicationImgPath = await db('medication_photo')
			.where({ medication_name: `${medicationName}` })
			.select('medication_photo_name')
			.first();
		return medicationImgPath.medication_photo_name;
	} catch (error) {
		return console.error(error);
	}
}

export async function createUserMedication(newMedication, userId) {
	console.log(newMedication);
	try {
		const postBody = {
			"user_id": userId,
			"medication_name": newMedication.medication_name,
			"user_dosage": newMedication.user_dosage,
			"pill_dosage": newMedication.pill_dosage,
			"medication_dose_time": newMedication.medication_dose_time
		}
		const postingResult = await db('user_medication').insert(postBody);
		const newMedicationId = postingResult[0];
		const createdMedication = await db('user_medication')
			.where({ id: newMedicationId })
			.first();
		return createdMedication;
	} catch (error) {
		return console.error(error);
	}
}

export function validateMedicationInput(newMedication) {
	console.log(newMedication);
	const {
		medication_name,
		user_dosage,
		pill_dosage,
		medication_dose_time,
	} = newMedication;

	if (
		!medication_name ||
		!user_dosage ||
		!pill_dosage ||
		!medication_dose_time
	) {
		return false;
	} else {
		return true;
	}
}
