#backend-test

To run this app, it's recommended to use node version >= 10.

  Commands:
  - With npm: npm run server-npm
  - With yarn: yarn server-yarn

Please, note: if you will use your browser to make the requests you have to open the dev tools in "http://localhost:8005".

- For using the endpoints you will need to authenticate first and obtain your user token (please note, to change user roles, you will have to get the token again using the credentials for a user with the role you want):
  - It is recommended to use http clients such as postman or insomnia to make the requests. But I'll provide example scripts so you can make the requests in other environments if you want.
  -There is a working example at the end of this file

<br>

*********************************************************************************
ENDPOINT: GET /auth-service/token

To get the auth token you must provide the username and id of a client, as headers.
Like, user: 'user name here'; id: 'user id here'

For example:

  ```javascript
  //auth fetch with user role: admin; get user token for admin (this user has admin roles)
  fetch('http://localhost:8005/auth-service/token',
    {
      headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your token
  ```
  or with curl
  ```bash
  curl -i -H "user: Britney" -H "id: a0ece5db-cd14-4f21-812f-966633e7be86" http://localhost:8005/auth-service/token
  ```

```javascript
  fetch('http://localhost:8005/auth-service/token',
    {
      headers: { 'user': 'Barnett', 'id': 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd' },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your token
```

or with curl
```bash
 curl -i -H "user: Barnett" -H "id: a3b8d425-2b60-4ad7-becc-bedf2ef860bd" http://localhost:8005/auth-service/token
```

*********************************************************************************

ENDPOINT: GET /users/id/:id

Get a user filtering by user id. Must provide the auth token as a header, like: token: 'your token here'

Example Code:

  ```javascript
  const token = 'your token here';
  fetch('http://localhost:8005/users/id/:id', //replace :id with the user id in the url
    {
      headers: { 'token': token },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your filtered user
  ```
  or with curl
  ```bash
  curl -i -H "token: your token here" http://localhost:8005/users/id/:id
  ```

*********************************************************************************

ENDPOINT: GET /users/name/:name

Get a user filtering by user name. Must provide the auth token as a header, like: token: 'your token here'

Example Code:

  ```javascript
  const token = 'your token here';
  fetch('http://localhost:8005/users/name/:name', //replace :name with the user id in the url
    {
      headers: { 'token': token },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your filtered user
  ```
  or with curl
  ```bash
  curl -i -H "token: your token here" http://localhost:8005/users/name/:name
  ```

*********************************************************************************

ENDPOINGT: GET /users/policy_number/:policy_number

Get a user by filtering by policy number. Must provide the auth token as a header, like: token: 'your token here'

Note: The policy id is "id" in the policy object. For example: 
  {
    "id": "64cceef9-3a01-49ae-a23b-3761b604800b",
    "amountInsured": 1825.89,
    "email": "inesblankenship@quotezart.com",
    "inceptionDate": "2016-06-01T03:33:32Z",
    "installmentPayment": true,
    "clientId": "e8fd159b-57c4-4d36-9bd7-a59ca13057bb"
  }

Example Code:

  ```javascript
  const token = 'your token here';
  fetch('http://localhost:8005/users/policy_number/:policy_number', //replace :policy_number with the user policy number in the url
    {
      headers: { 'token': token },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your filtered user
  ```
  or with curl
  ```bash
  curl -i -H "token: your token here" http://localhost:8005/users/policy_number/:policy_number
  ```

*********************************************************************************

ENDPOINT: GET /policies/user/:name

Get the policies that are linked to a user name. Must provide the auth token as a header, like: token: 'your token here'

Example Code:

  ```javascript
  const token = 'your token here';
  fetch('http://localhost:8005/policies/user/:name', //replace :policy_number with the user policy number in the url
    {
      headers: { 'token': token },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your filtered policies
  ```
  or with curl
  ```bash
  curl -i -H "token: your token here" http://localhost:8005/policies/user/:name
  ```
*********************************************************************************

You can also get the complete users and policies lists, so you can check clients and policies without having to go outside of the app.

ENDPOINT: GET /lists/users
ENDPOINT: GET /lists/policies

You will only need the auth token, but must be an admin token. Must provide the auth token as a header, like: token: 'your token here'

Example Code:

  ```javascript
  const token = 'your token here';
  fetch('http://localhost:8005/lists/users', //replace :policy_number with the user policy number in the url
    {
      headers: { 'token': token },
    })
    .then(response => response.json())
    .then(data => console.log(data)); //this will log your filtered policies
  ```
  or with curl
  ```bash
  curl -i -H "token: your token here" http://localhost:8005/lists/users
  ```

*********************************************************************************


Here is a working example:

```javascript
fetch('http://localhost:8005/auth-service/token',
  {
    headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
  })
  .then(response => response.json())
  .then(token => {

    fetch('http://localhost:8005/users/id/a0ece5db-cd14-4f21-812f-966633e7be86',
      {
        headers: { 'token': token },
      })
      .then(response => response.json())
      .then(user => {
        console.log(user)
      });
  });
```