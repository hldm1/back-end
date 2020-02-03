const { Token } = require('../helpers/auth/tokenHandles');
const { isVerified } = require('../utils/auth');
const { generateToken } = require('../utils/auth');


test('returns a user token that follows a jwt pattern', () => {
  const testingCreds = { user: 'Whitley', id: '0178914c-548b-4a4c-b918-47d6a391530c' };

  const { token } = generateToken(testingCreds);
  const pattern = new RegExp(/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/);

  expect(pattern.test(token)).toBe(true);
});

test('the token returned is succesfully verified, it will return an object with 9 keys', () => {
  const testingCreds = { user: 'Barnett', id: 'a3b8d425-2b60-4ad7-becc-bedf2ef860bd' };
  const tokenHandling = new Token(testingCreds);

  const { token } = generateToken(testingCreds);

  expect(Object.keys(tokenHandling.tokenVerify(token)).length).toBe(9);
});

test('A user with admin role, provided will have the proper user roles', () => {
  const testingCreds = { user: 'Manning', id: 'e8fd159b-57c4-4d36-9bd7-a59ca13057bb' };

  const { token } = generateToken(testingCreds);

  expect(isVerified(token, ['admin'])).toBe(true);
});