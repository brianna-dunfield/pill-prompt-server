// seeds/seed_user_medication.js
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex('user_medication').del();

	// Inserts seed entries
	await knex('user_medication').insert([
		{
			user_id: 1,
			medication_name: 'Lisinopril',
			user_dosage: 20,
			pill_dosage: 10,
			medication_dose_time: '08:00:00',
		},
		{
			user_id: 1,
			medication_name: 'Metformin',
			user_dosage: 1000,
			pill_dosage: 500,
			medication_dose_time: '12:00:00',
		},
		{
			user_id: 1,
			medication_name: 'Atorvastatin',
			user_dosage: 40,
			pill_dosage: 20,
			medication_dose_time: '20:00:00',
		},
		{
			user_id: 1,
			medication_name: 'Amlodipine',
			user_dosage: 5,
			pill_dosage: 5,
			medication_dose_time: '08:00:00',
		},
		{
			user_id: 1,
			medication_name: 'Hydrochlorothiazide',
			user_dosage: 25,
			pill_dosage: 25,
			medication_dose_time: '09:00:00',
		},
		{
			user_id: 1,
			medication_name: 'Levothyroxine',
			user_dosage: 50,
			pill_dosage: 25,
			medication_dose_time: '07:00:00',
		},
	]);
}
