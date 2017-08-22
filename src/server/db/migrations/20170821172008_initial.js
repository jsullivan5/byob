
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('questions', (table) => {
      table.increments('id').primary();
      table.integer('game_id').unsigned();
      table.integer('season').unsigned();
      table.string('round');
      table.float('row', 2);
      table.float('column', 2);
      table.string('category');
      table.integer('value').unsigned();
      table.string('question_text');
      table.string('answer');
    }),
    knex.schema.createTable('locations', (table) => {
      table.increments('id').primary();
      table.integer('game_id').unsigned();
      table.foreign('game_id').references('questions.game_id');
      table.integer('player_id').unsigned();
      table.string('seat_location');
      table.integer('season').unsigned();
    }),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('locations'),
    knex.schema.dropTable('questions'),
  ]);
};
