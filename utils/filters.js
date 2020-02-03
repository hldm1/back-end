const { UserFilter, PolicyFilter, List } = require('../helpers/filtering');


/**
 * Handle the user filtering cases
 */
function filterUserData(param) {
  const filters = new UserFilter(param);

  if (param['policy_number']) {
    return filters.filterByPolicyNumber();
  } else {
    return filters.filterUserData();
  }
}

/**
 * Handle filtering of policies linked to a user name
 */
function filterPoliciesData(param) {
  const filters = new PolicyFilter(param);

  return filters.filterPoliciesByUserName();
}

/**
 * Return policies or clients list
 */
function getList(param) {
  const list = new List(param);

  if (param === 'users') return list.getUsersList();
  if (param === 'policies') return list.getPoliciesList();
}


exports.filterUserData = filterUserData;
exports.filterPoliciesData = filterPoliciesData;
exports.getList = getList;