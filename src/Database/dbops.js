import cards from './cards';
import payins from './payins';
import payouts from './payouts';
import transfers from './transfers';
import users from './users';
import wallets from './wallets';

const nameToList = {
  cards,
  payins,
  payouts,
  transfers,
  users,
  wallets,
};

function addElement(where, what) {
  // maybe check if the id doesn't exist yet?
  where.push(what);
}

function getById(where, id) {
  for (let i = 0; i < where.length; i += 1) {
    if (where[i].id === id) return where[i];
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
  addElement(askedList, what);
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

export {
  getFromDb,
  getAllFromDb,
  addToDb,
  userMatches,
};
