/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	return knex.schema.createTable('medication_photo', (table) => {
		table.increments('id').primary();
		table.string('medication_name');
		table.integer('pill_dosage');
		table.string('medication_photo_name');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	return knex.schema.dropTable('medication_photo');
};
