const fs = require('fs');
const { generateKeys } = require('../helpers/auth/generateRsaKeyPair');
const { Fetcher } = require('../helpers/fetchData');

/**
 * generate public and private keys if necessary
 * Update clients and policies
 */
function initialize(clientsUrl, policiesUrl) {
  const fetcher = new Fetcher(clientsUrl, policiesUrl);

  fs.readdir('./keys', (err, files) => {
    if (err) throw err;
    else if (!files.length) {
      generateKeys();
    }
  });

  fetcher.getClients();
  fetcher.getPolicies();
}

exports.initialize = initialize;
