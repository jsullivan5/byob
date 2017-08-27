const photoData = require('../../raw/cleanedExifData.json');
const locationData = require('../../raw/cleanedLocData.json');

exports.seed = function (knex, Promise) {
  return knex('photos').del()
    .then(() => knex('locations').del())
    .then(() => knex('locations').insert(locationData))
    .then(() => knex('photos').insert(photoData));
};
