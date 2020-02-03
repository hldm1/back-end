const { Token } = require('../helpers/auth/tokenHandles');

/**
 * 
 * Generate Token and return it to the user 
 */
function generateToken(userInfo) {
  const tokenHandler = new Token({ userInfo });

  return tokenHandler.issueToken();
}


/**
 * Check if token has the neccesary roles
 */
const verifyResult = (token, required) => {
  const {
    role,
  } = token;
  const hasPermission = required.some(clientRole => role === clientRole);

  return hasPermission;
};

/**
 * Receive user token and the required roles for the endpoint,
 * then determine if the token is valid and if user has neccesary roles
 */
const isVerified = (token, [...requiredRole]) => {
  const tokenHandler = new Token({});

  const tokenVerification =  tokenHandler.tokenVerify(token);
  const verificationResult = verifyResult(tokenVerification, requiredRole);

  return verificationResult ? true : false;
};

exports.isVerified = isVerified;
exports.generateToken = generateToken;