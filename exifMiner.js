const ExifImage = require('exif').ExifImage;
const fs = require('fs');

const photoFile1 = '/Users/jamessullivan/Desktop/sonya6000sample';

class ExifData {
  constructor(data) {
    this.make = data.image.make;
    this.model = data.image.model;
    this.shutterSpeed = data.exif.ExposureTime;
    this.FNumber = data.exif.FNumber;
    this.ExposureSetting = data.exif.ExposureProgram;
    this.ISO = data.exif.ISO;
    this.dateTime = data.exif.CreateDate;
    this.maxApertureValue = data.exif.maxApertureValue;
    this.focalLength = data.exif.FocalLength;
    this.location = data.gps;
  }
}

const exifPromise = filePath => new Promise((resolve, reject) => {
  new ExifImage({ image: filePath }, ((error, exifData) => {
    if (error) {
      console.log(`Exif Error: ${error.message}`);
    } else {
      resolve(exifData);
    }
  }
  ));
});

fs.readdir(photoFile1, (err, files) => {
  if (err) {
    console.log('Could not read files from that directory.', err);
    process.exit(1);
  }

  const exifPromiseArray = files.map((file, index) => {
    if (file.endsWith('.JPG') || file.endsWith('.jpg')) {
      const data = exifPromise(`${photoFile1}/${file}`);
      console.log(data);
      return data;
    }
  }).filter(e => e !== undefined);


  Promise.all(exifPromiseArray)
    .then((data) => {
      fs.writeFile('./exifDataSony.json', JSON.stringify(data), 'utf8', (err) => {
        if (err) {
          return console.log(err);
        }
        console.log('File was saved.');
      });
    });
});
