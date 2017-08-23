
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
    table.string('name');
    table.string('address');
    table.string('description');
    table.string('insider_tips');
    table.specificType('lat', 'numeric');
    table.specificType('long', 'numeric');
  }),
  knex.schema.createTable('photos', (table) => {
    table.increments('id').primary();
    table.integer('location_id').unsigned();
    table.foreign('location_id').references('locations.id');
    table.integer('camera_id').unsigned();
    table.foreign('camera_id').references('cameras.id');
    table.string('url');
    table.string('name');
    table.string('description');
    table.decimal('aperture_value'); // exif.ApertureValue
    table.string('iso'); // exif.ISO
    table.string('exposure_mode');
    table.string('exposure_time_seconds');
    table.string('content_creation_date');
    table.string('altitude');
    table.string('acquisition_model');
    table.string('acquisition_make');
    table.string('fnumber');
    table.string('lens_info');
    table.string('lens_make');
    table.string('lens_model');
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('cameras'),
  knex.schema.dropTable('locations'),
  knex.schema.dropTable('photos'),
]);
