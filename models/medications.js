import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig);

export async function getUserMedications(userId) {
    console.log("USER ID:", userId)
	try {
		const medicationsList = await db('user_medication')
			.where({ user_id: userId })
			.select('*');
		return medicationsList;
	} catch (error) {
		return console.error(error);
	}
}

export async function getOneUserMedication({ userId, medicationName }) {
	try {
		const medicationInfo = await db('user_medication')
			.where({ user_id: userId })
			.where({ medication_name: medicationName })
			.first();
		return medicationInfo;
	} catch (error) {
		return console.error(error);
	}
}

export async function getMedicationImgPath({ medicationName }) {
	try {
		const medicationImgPath = await db('medication_photo')
			.where({ medication_name: medicationName })
			.select('medication_photo_name')
			.first();
		return medicationImgPath;
	} catch (error) {
		return console.error(error);
	}
}

export async function createUserMedication({ newMedication }) {
	try {
		const postingResult = await db('user_medication').insert(newMedication);
		const newMedicationId = postingResult[0];
		const createdMedication = await db('user_medication')
			.where({ id: newMedicationId })
			.first();
		return createdMedication;
	} catch (error) {
		return console.error(error);
	}
}

export function validateMedicationInput({ newMedication }) {
	const {
		user_id,
		medication_name,
		user_dosage,
		pill_dosage,
		medication_dose_time,
	} = newMedication;

    if(!user_id || !medication_name || !user_dosage || pill_dosage || !medication_dose_time){
        return false;
    }else{
        return true;
    }
}
