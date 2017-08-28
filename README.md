## BYOB 'FotoFinder' API

[![CircleCI](https://circleci.com/gh/the-oem/byob/tree/master.svg?style=svg)](https://circleci.com/gh/the-oem/byob/tree/master)

This implementation of BYOB is designed for use in photo applications, where enthusiasts can provide EXIF details about their photos, and connect photos to locations and cameras.

This is a REST API that uses JWT for endpoint authentication. All responses are returned in a standard JSON format, documented below.

*Success 200/201 Responses:*
```
{
  status: 'success',
  data: <returned data (array format)>
}
```

*Failure 404 Responses:*
```
{
  status: 'error',
  data: {
    error: <error message (string format)>,
  }
}
```
*Failure 500 Responses:*
```
{
  status: 'error',
  data: <error returned from server (object format)>,
}
```

---

## Endpoints

#### Camera Resources

- **[<code>GET</code> cameras](/docs/GET_cameras.md)** +
- **[<code>POST</code> cameras](https://github.com/the-oem/byob/blob/master/docs/POST_cameras.md)** +
- **[<code>GET</code> cameras/:id](https://github.com/the-oem/byob/blob/master/docs/GET_cameras_id.md)** +
- **[<code>PUT</code> cameras/:id](https://github.com/the-oem/byob/blob/master/docs/PUT_cameras_id.md)** +
- **[<code>DELETE</code> cameras/:id/:token](https://github.com/the-oem/byob/blob/master/docs/DELETE_cameras_id_token.md)** +

#### Locations Resources

- **[<code>GET</code> locations](/docs/GET_locations.md)** +
- **[<code>POST</code> locations](/docs/POST_locations.md)** +
- **[<code>GET</code> locations/:id](/docs/GET_locations_id.md)** +
- **[<code>PUT</code> locations/:id](/docs/PUT_locations.md)** +
- **[<code>DELETE</code> locations/:id/:token](/docs/DELETE_locations.md)** +

#### Photos Resources

- **[<code>GET</code> photos](/docs/GET_photos.md)** +
- **[<code>POST</code> photos](/docs/POST_photos.md)** +
- **[<code>GET</code> photos/:id](/docs/GET_photos_id.md)** +
- **[<code>PUT</code> photos/:id](/docs/PUT_photos.md)** +
- **[<code>DELETE</code> photos/:id/:token](/docs/DELETE_photos.md)** +

## Authentication
- **[<code>POST</code> admin](https://github.com/the-oem/byob/blob/master/docs/Auth.md)** +
