const ExifImage = require('exif').ExifImage;
const fs = require('fs');

const photoFile1 = '/Users/jamessullivan/Desktop/sonya6000sample';

const exifPromise = filePath => new Promise((resolve, reject) => new ExifImage(
  { image: filePath }, ((error, exifData) => (error ? reject(error) : resolve(exifData))
  )));

fs.readdir(photoFile1, (readErr, files) => {
  if (readErr) throw (new Error(readErr));

  const exifPromiseArray = files.map((file) => {
    if (file.endsWith('.JPG') || file.endsWith('.jpg')) {
      const data = exifPromise(`${photoFile1}/${file}`);
      return data;
    }
    return null;
  }).filter(e => e !== undefined);


  Promise.all(exifPromiseArray)
    .then((data) => {
      fs.writeFile('./exifDataSony.json', JSON.stringify(data), 'utf8', (writeErr) => {
        if (writeErr) throw (new Error(writeErr));
      });
    });
});
