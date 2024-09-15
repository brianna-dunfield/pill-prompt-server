// seeds/seed_medication_photo.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex('medication_photo').del();

	// Inserts seed entries
	await knex('medication_photo').insert([
		{
			medication_name: 'Lisinopril',
			pill_dosage: 10,
			medication_photo_name: 'lisinopril.jpg',
		},
		{
			medication_name: 'Metformin',
			pill_dosage: 500,
			medication_photo_name: 'metformin.jpg',
		},
		{
			medication_name: 'Atorvastatin',
			pill_dosage: 20,
			medication_photo_name: 'atorvastatin.jpg',
		},
		{
			medication_name: 'Amlodipine',
			pill_dosage: 5,
			medication_photo_name: 'amlodipine.jpg',
		},
		{
			medication_name: 'Hydrochlorothiazide',
			pill_dosage: 25,
			medication_photo_name: 'hydrochlorothiazide.jpg',
		},
		{
			medication_name: 'Levothyroxine',
			pill_dosage: 25,
			medication_photo_name: 'levothyroxine.jpg',
		},
	]);
}
