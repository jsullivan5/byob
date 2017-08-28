# Photos Resources

    GET photos

## Description
Returns a listing of all photos in the database.

***

## Parameters

Any properties of this object can be used as a querystring parameter to further filter the result set of this API call. As an example, you can use `?camera_id=1` to filter all photos taken by a specific camera type.

***

## Return format
An array with the following keys and values:

- **id** — Unique id of the photo.
- **location_id** - ID of the location the photo was taken.
- **camera_id** - ID of the camera used to take the photo.
- **url** - URL of the photo online.
- **name** — Name of the photo.
- **description** — Description of the photo.
- **aperture_value** - The aperture setting used for the photo.
- **iso** - The ISO setting used for the photo.
- **exposure_mode** - The exposure mode used for the photo.
- **shutter_speed** - The shutter speed used for the photo.
- **content_creation_date** - The data the photo was taken.
- **gps** - The GPS data of where the photo was taken.
- **acquisition_model** - The model of the camera used to take the photo.
- **acquisition_make** - The make of the camera used to take the photo.
- **fnumber** - The F-stop value used for the photo.
- **focal_length** - The focal length used for the photo.
- **lens_make** - The make of the lens used to take the photo.
- **lens_model** - The model of the lens used to take the photo.

***

## Errors
Errors (404 and 500) will be returned in the following format:
```
{
  status: 'error',
  data: <error object>,
}
```

***

## Example
**Request**

   GET api/v1/photos/

**Return** __shortened for example purpose__
``` json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "location_id": 4198,
      "camera_id": 2,
      "url": "http://www.flickr.com/12387gash64",
      "name": "A really great photo of a thing!",
      "description": "Picture from when we graduated.",
      "aperture_value": 2.27,
      "iso": 100,
      "exposure_mode": 0,
      "shutter_speed": 0.001409,
      "content_creation_date": "2017:06:29 18:21:03",
      "gps": {
          "GPSVersionID": [2, 3, 0, 0],
          "GPSLatitudeRef": "N",
          "GPSLatitude": [39, 44, 24.2937],
          "GPSLongitudeRef": "W",
          "GPSLongitude": [105, 1, 12.5232],
          "GPSAltitudeRef": 0,
          "GPSAltitude": 1715.421
      },
      "acquisition_model": "FC220",
      "acquisition_make": "DJI",
      "fnumber": 2.2,
      "focal_length": 4.73,
      "lens_make": null,
      "lens_model": null
  },{
      "id": 2,
      "location_id": 23174,
      "camera_id": 2,
      "url": "http://www.flickr.com/234hg2348",
      "name": "A really great photo of a thing!",
      "description": "From our great vacation.",
      "aperture_value": 2.27,
      "iso": 100,
      "exposure_mode": 0,
      "shutter_speed": 0.001244,
      "content_creation_date": "2017:06:29 18:21:48",
      "gps": {
          "GPSVersionID": [2, 3, 0, 0],
          "GPSLatitudeRef": "N",
          "GPSLatitude": [39, 44, 24.3801],
          "GPSLongitudeRef": "W",
          "GPSLongitude": [105, 1, 16.6831],
          "GPSAltitudeRef": 0,
          "GPSAltitude": 1715.021
      },
      "acquisition_model": "FC220",
      "acquisition_make": "DJI",
      "fnumber": 2.2,
      "focal_length": 4.73,
      "lens_make": null,
      "lens_model": null
  },{
      "id": 3,
      "location_id": 65433,
      "camera_id": 2,
      "url": "http://www.flickr.com/23481",
      "name": "A really great photo of a thing!",
      "description": "A description of the photo.",
      "aperture_value": 2.27,
      "iso": 100,
      "exposure_mode": 0,
      "shutter_speed": 0.004515,
      "content_creation_date": "2017:06:29 18:21:56",
      "gps": {
          "GPSVersionID": [2, 3, 0, 0],
          "GPSLatitudeRef": "N",
          "GPSLatitude": [39, 44, 24.3783],
          "GPSLongitudeRef": "W",
          "GPSLongitude": [105, 1, 16.6865],
          "GPSAltitudeRef": 0,
          "GPSAltitude": 1715.021
      },
      "acquisition_model": "FC220",
      "acquisition_make": "DJI",
      "fnumber": 2.2,
      "focal_length": 4.73,
      "lens_make": null,
      "lens_model": null
    }
  ]
}
```
