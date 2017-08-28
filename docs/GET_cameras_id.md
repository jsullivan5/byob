# Locations Resources

    GET cameras by ID

## Description
Returns a single camera, given the specified ID.

***

## Parameters

ID (`:id`), passed as part of the request URL.

***

## Return format
An array with the following keys and values:

- **id** — Unique id of the camera.
- **model** — Model of the camera.
- **max_resolution** — Max resolution of the camera.
- **low_resolution** — Lowest resolution of the camera.
- **effective_pixels** — Pixel count of the camera.
- **zoom_wide** — A camera's lowest focal length.
- **zoom_tele** — A camera's maximum focal length.
- **normal_focus_range** — A camera's zoom range.
- **macro_focus_range** — A camera's minimum distance to a subject.
- **storage_included** — Onboard camera data storage.
- **weight** — DA camera's weight in lbs.
- **dimensions** — A camera's size in inches.
- **price** — A camera's approx. cost.

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

   GET api/v1/cameras/:id

**Return** __shortened for example purpose__
``` json
{
    "status": "success",
    "data": [
        {
            "id": 1,
            "model": "Sony a6000 ILCE-6000",
            "max_resolution": 1080,
            "low_resolution": 1080,
            "effective_pixels": 0,
            "zoom_wide": 38,
            "zoom_tele": 114,
            "normal_focus_range": 70,
            "macro_focus_range": 40,
            "storage_included": 4,
            "weight": 420,
            "dimensions": 95,
            "price": 179
        }
    ]
}
```
