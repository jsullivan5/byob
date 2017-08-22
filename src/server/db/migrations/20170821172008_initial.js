
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('cameras', (table) => {
    table.increments('id').primary();
    table.string('model');
    table.float('max_resolution');
    table.float('low_resolution');
    table.float('effective_pixels');
    table.float('zoom_wide');
    table.float('zoom_tele');
    table.float('normal_focus_range');
    table.float('macro_focus_range');
    table.float('storage_included');
    table.float('weight');
    table.float('dimensions');
    table.float('price', 1);
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('cameras'),
]);
