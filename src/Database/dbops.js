import cards from './cards';
import payins from './payins';
import payouts from './payouts';
import transfers from './transfers';
import users from './users';
import wallets from './wallets';

const nameToList = {
  // shorthand for cards: cards
  cards,
  payins,
  payouts,
  transfers,
  users,
  wallets,
};

function addElement(where, what) {
  where.push(what);
}

function getById(where, id) {
  for (let i = 0; i < where.length; i += 1) {
    if (where[i].id === id) return where[i];
  }
  return null;
}

function getUserByEmail(email) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].email === email) return users[i].id;
  }
  return null;
}
// these give you what you want as you give the string of the table
function getFromDb(where, id) {
  const askedList = nameToList[where];
  return getById(askedList, id);
}

function getAllFromDb(where) {
  return nameToList[where];
}

function addToDb(where, what) {
  const askedList = nameToList[where];
  if (getById(askedList, what.id) === false) return false;
  addElement(askedList, what);
  return true;
}

// returns false if the user doesn't match, or id of the user
function userMatches(email, password) {
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].email === email) {
      if (users[i].password === password) return users[i];
      return false;
    }
  }
  return false;
}

function updateInDb(wherename, id, newone) {
  const where = nameToList[wherename];
  for (let i = 0; i < where.length; i += 1) {
    if (where[i].id === id) {
      // because Object.assign did not work. Probably needed to import react.
      const keys = Object.keys(newone);
      for (let j = 0; j < keys.length; j += 1) {
        where[i][keys[j]] = newone[keys[j]];
      }
    }
  }
}

function getFromDbWhere(wherename, condition) {
  const whereList = nameToList[wherename];
  const rep = [];
  for (let i = 0; i < whereList.length; i += 1) {
    if (condition(whereList[i])) rep.push(whereList[i]);
  }
  return rep;
}

function getAvailableId(wherename) {
  const whereList = nameToList[wherename];
  let maxId = 1;
  for (let i = 0; i < whereList.length; i += 1) {
    if (whereList[i].id >= maxId) maxId = whereList[i].id + 1;
  }
  return maxId;
}

export {
  getFromDb,
  getAllFromDb,
  addToDb,
  userMatches,
  updateInDb,
  getFromDbWhere,
  getAvailableId,
  getUserByEmail,
};
