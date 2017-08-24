
const photoData = require('../../raw/cleanedExifData.json');
const locationData = require('../../raw/cleanedLocData.json');
// const path = require('path');
// const transformer = require('knex-csv-transformer').transformer;
// const transfomerHeader = require('knex-csv-transformer').transfomerHeader;

// const cameraSeed = transformer.seed({
//   table: 'cameras',
//   file: path.join(__dirname, '../../csv/camera_dataset.csv'),
//   transformers: [
//     transfomerHeader('model', 'model'),
//     transfomerHeader('max_resolution', 'max_resolution'),
//     transfomerHeader('low_resolution', 'low_resolution'),
//     transfomerHeader('effective_pixels', 'effective_pixels'),
//     transfomerHeader('zoom_wide', 'zoom_wide'),
//     transfomerHeader('zoom_tele', 'zoom_tele'),
//     transfomerHeader('normal_focus_range', 'normal_focus_range'),
//     transfomerHeader('macro_focus_range', 'macro_focus_range'),
//     transfomerHeader('storage_included', 'storage_included'),
//     transfomerHeader('weight', 'weight'),
//     transfomerHeader('dimensions', 'dimensions'),
//     transfomerHeader('price', 'price'),
//   ],
// });

exports.seed = function (knex, Promise) {
  return knex('photos').del()
    .then(() => knex('locations').del())
    // .then(() => cameraSeed())
    .then(() => knex('locations').insert(locationData))
    .then(() => knex('photos').insert(photoData));
};
