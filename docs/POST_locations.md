# Locations Resources

    POST locations

## Description
Returns the newly created location.

***

## Parameters

Pass the values of the new object in the request body.

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

   POST api/v1/locations/

**Return** __shortened for example purpose__
``` json
{
  "status": "success",
  "data":
    {
        "id": 4198,
        "name": "Crist LLC",
        "address": "5278 Gottlieb Groves",
        "description": null,
        "insider_tips": null,
        "lat": "39.740081583333335",
        "lon": "39.740081583333335",
        "altitude": null
    }
}
```
