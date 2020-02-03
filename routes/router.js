const express = require('express');
const bodyParser = require('body-parser');

const { isVerified, generateToken } = require('../utils/auth');
const { filterUserData, filterPoliciesData, getList } = require('../utils/filters');

//Router configs
const router = express.Router();

router.use(bodyParser.json());


/**
 * User filtering routes
 */

//filter user by id
router.get('/users/id/:id', (req, res, next) => {
  const Token = req.headers['token'];
  const { id } = req.params;

  if (isVerified(Token, ['user', 'admin'])) {
    //Check that the user is found
    const filteredData = filterUserData({ id });

    switch (filteredData) {
      case 'Not Found':
        res.status(404).send('User Not Found');
        break;

      default:
        res.status(200).json(filteredData);
        break;
    }
  } else res.status(401).send('Unauthorized');

  next();
});

//Filter user by name
router.get('/users/name/:name', (req, res, next) => {
  const Token = req.headers['token'];
  const { name } = req.params;

  if (isVerified(Token, ['user', 'admin'])) {
    //Check that the user is found
    const filteredData = filterUserData({ name });

    switch (filteredData) {
      case 'Not Found':
        res.status(404).send('User Not Found');
        break;

      default:
        res.status(200).json(filteredData);
        break;
    }
  } else res.status(401).send('Unauthorized');

  next();
});


//Get user linked to policy number
router.get('/users/policy_number/:policy_number', (req, res, next) => {
  const Token = req.headers['token'];
  const { policy_number } = req.params;

  if (isVerified(Token, ['admin'])) {
    //Check that the policy is found
    const filteredData = filterUserData({ policy_number });

    switch (filteredData) {
      case 'Not Found':
        res.status(404).send('Policy Not Found');
        break;

      default:
        res.status(200).json(filteredData);
        break;
    }
  } else res.status(401).send('Unauthorized');

  next();
});



//Policies Routes

//Get policies linked to a user name
router.get('/policies/user/:name', (req, res, next) => {
  const Token = req.headers['token'];
  const { name } = req.params;

  if (isVerified(Token, ['admin'])) {
    const filteredData = filterPoliciesData({ name });

    switch (filteredData) {
      case 'Not Found':
        res.status(404).send('Policies Not Found');
        break;

      default:
        res.status(200).json(filteredData);
        break;
    }
  } else res.status(401).send('Unauthorized');

  next();
});

//Issue Token

router.get('/auth-service/token', (req, res, next) => {
  const { user, id } = req.headers;
  const userData = { user, id };

  const { token } = generateToken(userData);

  res.status(200).json(token);

  next();
});

router.get('/', (req, res, next) => {
  res.status(200).send('welcome');

  next();
});


//Routes to get both clients and policies complete lists respectively
//This is to be able to check and use the data from this lists more easily

router.get('/lists/users', (req, res, next) => {
  const Token = req.headers['token'];

  if (isVerified(Token, ['admin'])) res.status(200).json(getList('users'));
  else res.status(401).send('Unauthorized');

  next();
});

router.get('/lists/policies', (req, res, next) => {
  const Token = req.headers['token'];

  if (isVerified(Token, ['admin'])) res.status(200).json(getList('policies'));
  else res.status(401).send('Unauthorized');

  next();
});


module.exports = router;
