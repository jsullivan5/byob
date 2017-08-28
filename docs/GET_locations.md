# Locations Resources

    GET locations

## Description
Returns a listing of all locations in the database.

***

## Parameters

Any properties of this object can be used as a querystring parameter to further filter the result set of this API call. As an example, you can use `?name=Turing+School` to filter all photos taken at a specific location name.

***

## Return format
An array with the following keys and values:

- **id** — Unique id of the location.
- **name** - Name of the location.
- **address** - Address of the location.
- **description** - Description of the location.
- **insider_tips** - Insider tips of the location.
- **lat** - Latitude decimal value of the location.
- **lon** - Longitude decimal value of the location.
- **altitude** - Altitude of the location.

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

   GET api/v1/locations/

**Return** __shortened for example purpose__
``` json
{
  "status": "success",
  "data": [
    {
        "id": 4198,
        "name": "Crist LLC",
        "address": "5278 Gottlieb Groves",
        "description": null,
        "insider_tips": null,
        "lat": "39.740081583333335",
        "lon": "39.740081583333335",
        "altitude": null
    },
    {
        "id": 23174,
        "name": "Mills - Hagenes",
        "address": "51366 Shyanne Isle",
        "description": null,
        "insider_tips": null,
        "lat": "39.74010558333333",
        "lon": "39.74010558333333",
        "altitude": null
    },
    {
        "id": 65433,
        "name": "Hirthe, Nitzsche and Hammes",
        "address": "1026 Sipes Camp",
        "description": null,
        "insider_tips": null,
        "lat": "39.74010508333333",
        "lon": "39.74010508333333",
        "altitude": null
    }
  ]
}
```
