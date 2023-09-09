export async function up(knex) {
  return knex.schema.createTable('todo', (table) => {
    table.increments('id')
    table.string('task')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('todo')
}
