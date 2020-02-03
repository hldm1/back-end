const fetch = require('node-fetch');
const fs = require('fs');


class Fetcher {
  constructor(clients, policies) {
    this.clients = clients;
    this.policies = policies;
  };

  /**
   * Get clients list from the url, then save them to the data folder
   */
  getClients() {
    fetch(this.clients)
      .then(response => response.json())
      .then(json => {
        fs.writeFile('./data/clients.json', JSON.stringify(json), err => {
          if (err) throw err;
          console.log('clients saved');
        })
      })
  };

  /**
   * Get policies list from the url, then save them to the data folder
   */
  getPolicies() {
    fetch(this.policies)
      .then(response => response.json())
      .then(json => {
        fs.writeFile('./data/policies.json', JSON.stringify(json), (err) => {
          if (err) throw err;
          console.log('policies saved');
        })
      })
  };

}

exports.Fetcher = Fetcher;
