
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
  knex.schema.createTable('locations', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('address').notNullable();
    table.string('description');
    table.string('insider_tips');
    table.specificType('lat', 'numeric').notNullable();
    table.specificType('lon', 'numeric').notNullable();
    table.specificType('altitude', 'numeric');
  }),
  knex.schema.createTable('photos', (table) => {
    table.increments('id').primary();
    table.integer('location_id').unsigned().notNullable();
    table.foreign('location_id').references('locations.id');
    table.integer('camera_id').unsigned().notNullable();
    table.foreign('camera_id').references('cameras.id');
    table.string('url');
    table.string('name').notNullable();
    table.string('description');
    table.float('aperture_value');
    table.integer('iso').unsigned();
    table.integer('exposure_mode').unsigned();
    table.float('shutter_speed');
    table.string('content_creation_date');
    table.json('gps');
    table.string('acquisition_model');
    table.string('acquisition_make');
    table.float('fnumber');
    table.float('focal_length');
    table.string('lens_make');
    table.string('lens_model');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('photos'),
  knex.schema.dropTable('cameras'),
  knex.schema.dropTable('locations'),
]);
