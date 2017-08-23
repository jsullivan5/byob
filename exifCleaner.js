const fs = require('fs');
const seedData = require('./exif.json');


class ExifData {
  constructor(data) {
    this.location_id = 1;
    this.camera_id = 1;
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

const data = seedData.map(image => new ExifData(image));

fs.writeFile('./cleanedExifData.json', JSON.stringify(data), 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('File was saved.');
  return true;
});
