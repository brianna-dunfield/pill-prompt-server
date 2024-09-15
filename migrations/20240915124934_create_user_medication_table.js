/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
	return knex.schema.createTable('user_medication', (table) => {
		table.increments('id').primary();
		table
			.integer('user_id')
			.unsigned()
			.references('users.id')
			.onUpdate('CASCADE')
			.onDelete('CASCADE');
		table.string('medication_name');
		table.integer('user_dosage');
		table.integer('pill_dosage');
		table.time('medication_dose_time');
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
	return knex.schema.dropTable('user_medication');
};
