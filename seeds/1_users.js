// seeds/seed_users.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
	// Deletes ALL existing entries
	await knex('users').del();

	// Inserts seed entries
	await knex('users').insert([
		{
			id: 1,
			user_name: 'John Doe',
			user_email: 'john.doe@example.com',
		},
	]);
}
