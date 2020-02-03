const { generateKeyPair } = require('crypto');
const fs = require('fs');

/**
 * Generate private and public key pairs,
 * then store them in the keys folder in the root of the app
 */
const generateKeys = () => {
  generateKeyPair('rsa', {
    modulusLength: 512,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  }, (err, publicKey, privateKey) => {
    if (err) throw err;
    if (publicKey) {

      fs.writeFile('./keys/public.key', publicKey, (err) => {
        if (err) throw err;
        console.log('public key generated');
      });
    }
    if (privateKey) {

      fs.writeFile('./keys/private.key', privateKey, (err) => {
        if (err) throw err;
        console.log('private key generated');
      });
    }
  });
};

exports.generateKeys = generateKeys;