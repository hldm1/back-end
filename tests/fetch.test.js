const fetch = require('node-fetch');

//For this Tests to work, the server must be running

//filter by id
const getUserDataById = (expect) => {
  fetch('http://localhost:8005/auth-service/token',
    {
      headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
    })
    .then(response => response.json())
    .then(token => {
      fetch('http://localhost:8005/users/id/9bda74be-d3c5-4161-a862-571b5ff03185', { method: 'get', headers: { 'token': token } })
        .then(res => res.json())
        .then(data => {
          expect(Object.keys(data).length).toBe(4);
        })
        .catch(err => { if (err) throw err; });
    })
    .catch(err => { if (err) throw err; });
};

describe('should get the object with user data by filtering by id, its an object with 4 keys', () => {
  test('get user data, filtered by id', () => {
    getUserDataById(expect);
  });
});

//filter by name
const getUserDataByName = (expect) => {
  fetch('http://localhost:8005/auth-service/token',
    {
      method: 'get',
      headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
    })
    .then(response => response.json())
    .then(token => {
      fetch('http://localhost:8005/users/name/Barnett',
        {
          method: 'get',
          headers: { 'token': token }
        })
        .then(res => res.json())
        .then(data => {
          expect(Object.keys(data).length).toBe(4);
        })
        .catch(err => { if (err) throw err; });
    })
    .catch(err => { if (err) throw err; });
};

describe('should get the object with user data by filtering by name, its an object with 4 keys', () => {
  test('get user data, filtered by name', () => {
    getUserDataByName(expect);
  });
});

//filter user by policy number

const getUserByPolicyNumber = (expect) => {
  fetch('http://localhost:8005/auth-service/token',
    {
      method: 'get',
      headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
    })
    .then(response => response.json())
    .then(token => {
      fetch('http://localhost:8005/users/policy_number/25202f31-fff0-481c-acfd-1f3ff2a9bcbe',
        {
          method: 'get',
          headers: { 'token': token }
        })
        .then(res => res.json())
        .then(data => {
          expect(Object.keys(data).length).toBe(4);
        })
        .catch(err => { if (err) throw err; });
    })
    .catch(err => { if (err) throw err; });
};

describe('should get the object with user data by filtering by policy number, its an object with 4 keys', () => {
  test('get user data, filtered by policy number', () => {
    getUserByPolicyNumber(expect);
  });
});

//filter policy by client id

const getPolicyByClientId = (expect) => {
  fetch('http://localhost:8005/auth-service/token',
    {
      method: 'get',
      headers: { 'user': 'Britney', 'id': 'a0ece5db-cd14-4f21-812f-966633e7be86' },
    })
    .then(response => response.json())
    .then(token => {
      fetch('http://localhost:8005/policies/user/Britney',
        {
          method: 'get',
          headers: { 'token': token }
        })
        .then(res => res.json())
        .then(data => {
          expect(typeof data).toBe('object');
        })
        .catch(err => { if (err) throw err; });
    })  
    .catch(err => { if (err) throw err; });
};

describe('should get the object with policy data by filtering by client id, its an object with 6 keys', () => {
  test('get policy data, filtered by client id', () => {
    getPolicyByClientId(expect);
  });
});
