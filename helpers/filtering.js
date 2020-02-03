const fs = require('fs');

class UserFilter {
  constructor(properties) {
    this.properties = properties;
  }

  handleFiltering(list, propertyName, optional1, optional2, optionalObject, getArray) {
    let filtered;
    if (optionalObject) {
      const [filteredItem] = list.filter(item => item[optional1 ? optional1 : propertyName] === optionalObject[optional2 ? optional2 : propertyName]);
      filtered = filteredItem;
    } else {
      const [filteredItem] = list.filter(item => item[optional1 ? optional1 : propertyName] === this.properties[optional2 ? optional2 : propertyName]);
      filtered = filteredItem;
    }

    //return an array
    if (getArray) {
      const filteredItems = list.filter(item => item[optional1 ? optional1 : propertyName] === optionalObject[optional2 ? optional2 : propertyName]);
      filtered = filteredItems;
    }

    return filtered;
  }

  /**
   * Read Policies data and get a user that is linked to the policy number
   */
  filterByPolicyNumber() {
    let client;
    const { clients } = JSON.parse(fs.readFileSync('./data/clients.json', 'utf-8'));
    const { policies } = JSON.parse(fs.readFileSync('./data/policies.json', 'utf-8'));
    const [propertyName] = Object.keys(this.properties);
    const filteredPolicy = this.handleFiltering(policies, propertyName, 'id');

    if (filteredPolicy === undefined) client = 'Not Found';
    else {
      const filteredClient = this.handleFiltering(clients, '', 'id', 'clientId', filteredPolicy);
      client = filteredClient;
    }

    return client;
  }

  /**
   * Read the clients data and get a particular client filtered depending on the case
   */
  filterUserData() {
    let client;
    const { clients } = JSON.parse(fs.readFileSync('./data/clients.json', 'utf-8'));
    const [propertyName] = Object.keys(this.properties);
    const filteredClient = this.handleFiltering(clients, propertyName);

    if (filteredClient === undefined) client = 'Not Found';
    else client = filteredClient;

    return client;
  }
}

class PolicyFilter extends UserFilter {
  constructor(properties) {
    super(properties);
  }

  /**
   * Get Policies linked to a user name
   */
  filterPoliciesByUserName() {
    let policiesList;
    const { clients } = JSON.parse(fs.readFileSync('./data/clients.json', 'utf-8'));
    const { policies } = JSON.parse(fs.readFileSync('./data/policies.json', 'utf-8'));
    const [propertyName] = Object.keys(this.properties);

    const filteredClient = this.handleFiltering(clients, propertyName);
    const filteredPolicies = filteredClient !== undefined ? this.handleFiltering(policies, '', 'clientId', 'id', filteredClient, true) : undefined;

    if(filteredPolicies === undefined) policiesList = 'Not Found';
    else policiesList = filteredPolicies;

    return policiesList;
  }
}

/**
 * Expose both clients and policies list to be able to check them more easily
 */
class List {
  getUsersList() {
    const { clients } = JSON.parse(fs.readFileSync('./data/clients.json', 'utf-8'));

    return clients;
  }

  getPoliciesList() {
    const { policies } = JSON.parse(fs.readFileSync('./data/policies.json', 'utf-8'));

    return policies;
  }
}

exports.UserFilter = UserFilter;
exports.PolicyFilter = PolicyFilter;
exports.List = List;