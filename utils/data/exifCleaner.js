const fs = require('fs');
const path = require('path');

const seedData = require('../../src/server/db/raw/exif.json');
const dms2dec = require('dms2dec');
const faker = require('faker');

const locationData = [];

class ExifData {
  constructor(data) {
    if (data.image.Make === 'SONY') this.camera_id = 1;
    if (data.image.Make === 'DJI') this.camera_id = 2;
    if (data.image.Make === 'Apple') this.camera_id = 3;
    this.aperture_value = data.exif.ApertureValue;
    this.iso = data.exif.ISO;
    this.exposure_mode = data.exif.ExposureMode;
    this.shutter_speed = data.exif.ExposureTime;
    this.content_creation_date = data.exif.CreateDate;
    this.gps = data.gps;
    this.acquisition_model = data.image.Model;
    this.acquisition_make = data.image.Make;
    this.fnumber = data.exif.FNumber;
    this.focal_length = data.exif.FocalLength;
    this.lens_make = data.exif.LensMake;
    this.lens_model = data.exif.LensModel;
  }
}

const geoDecimal = (lat, latDir, lon, lonDir) => {
  if (lat && latDir && lon && lonDir) {
    return dms2dec(lat, latDir, lon, lonDir);
  }
  return ['', ''];
};

class GeoData {
  constructor(data) {
    const loc = geoDecimal(
      data.GPSLatitude,
      data.GPSLatitudeRef,
      data.GPSLongitude,
      data.GPSLongitudeRef);
    this.lat = loc[0];
    this.long = loc[1];
    this.name = faker.company.companyName();
    this.address = faker.address.streetAddress();
  }
}

const data = seedData.map((image) => {
  const locationId = faker.random.number();
  const exif = new ExifData(image);
  const geo = new GeoData(image.gps);
  locationData.push(Object.assign(geo, { id: locationId }));
  return Object.assign(exif, { location_id: locationId });
});

fs.writeFile(path.join(__dirname, '../../src/server/db/raw/cleanedExifData.json'), JSON.stringify(data), 'utf8', (err) => {
  if (err) throw (new Error(err));
  return true;
});

fs.writeFile(path.join(__dirname, '../../src/server/db/raw/cleanedLocData.json'), JSON.stringify(locationData), 'utf8', (err) => {
  if (err) throw (new Error(err));
  return true;
});
