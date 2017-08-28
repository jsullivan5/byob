# Photos Resources

    POST auth

## Description
Returns a json web token to be used to write to the database.

***

## Parameters

An email and app name must be provided in the following format:

```
{
	"email": "bilbo@example.com",
	"appName": "LOTR"
}
```

***

## Return format
An object with the following keys and values:

- **token** — Your json web token.



## Example
**Request**

   POST api/v1/auth

**Return** __shortened for example purpose__
``` json
{
    "token": "exampleTokenValue"
}
```
