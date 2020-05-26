exports.up = function (knex) {
  return knex.schema
    .createTable('users', (users) => {
      users.increments();
      users.string('first_name');
      users.string('last_name');
      users.string('username', 20).notNullable().unique();
      users.string('password', 20).notNullable();
      users.integer('phone', 11).notNullable();
    })

    .createTable('plants', (plants) => {
      plants.increments();
      plants.string('name', 50).notNullable();
      plants.string('species', 50).notNullable();
      plants.string('water_freq', 50).notNullable();
      plants
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
