# Locations Resources

    DELETE camera

## Description
Returns a success message for deletion.

***

## Parameters

Pass the ID (`:id`) of the object to be deleted.
Pass an authorization (`:token`) with administer privileges.

***

## Return format
An object with a status and success message:

- **status** — Status of the deletion.
- **data** - An object containing the success or error message.

***

## Errors
Errors (500) will be returned in the following format:
```
{
  status: 'error',
  data: <error object>,
}
```

***

## Example
**Request**

   DELETE api/v1/cameras/:id/:token

**Return** __shortened for example purpose__
``` json
{
    "status": "success",
    "data": {
        "message": "Camera with id (16) was deleted."
    }
}
```
