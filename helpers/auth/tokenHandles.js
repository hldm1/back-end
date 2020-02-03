const fs = require('fs');
const jwt = require('jsonwebtoken');

const issuer = 'hlm';
const subject = 'backendtest';
const audience = 'sopra';
const expires = '12h';
const algorithm = 'RS256';

class Token {
  constructor({ userInfo }) {
    this.userInfo = userInfo;
  }

  /**
   * Generate the user token, storing the user data inside the token
   */
  tokenGenerator(userData) {
    const privateKey = fs.readFileSync('keys/private.key', 'utf-8');

    const payload = userData;

    const signingOptions = {
      issuer: issuer,
      subject: subject,
      audience: audience,
      expiresIn: expires,
      algorithm: algorithm
    };

    const token = jwt.sign(payload, privateKey, signingOptions);

    return { token };
  }

  /**
   * Verify the user token is valid
   */
  tokenVerify(token) {
    const publicKey = fs.readFileSync('keys/public.key', 'utf-8');

    const verifyOptions = {
      issuer: issuer,
      subject: subject,
      audience: audience,
      expiresIn: expires,
      algorithm: [algorithm]
    };

    const verification = jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
      if (err) return false;
      else return decoded;
    });

    return verification;
  }

  /**
 * Receive client credentials and issue an auth token
 */
  issueToken() {
    const {
      user,
      id
    } = this.userInfo;

    let tokenInfo;

    const { clients } = JSON.parse(fs.readFileSync('./data/clients.json', 'utf-8'));

    /**
     * if a client is found in the clients list, 
     * retrieve client information and generate a token with its information
     */
    const [...userFound] = clients.filter(client => client.name === user && client.id === id);

    if (userFound !== undefined) tokenInfo = this.tokenGenerator(...userFound);
    else console.log('user not found');

    return tokenInfo;
  }
}

exports.Token = Token;
