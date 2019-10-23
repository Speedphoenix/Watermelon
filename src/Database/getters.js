import users from './users';

function getUsers() {
  return users;
}

function getById(where, id) {
  for (let i = 0; i < where.length; i += 1) {
    if (where[i].id === id) return where[i];
  }
  return null;
}

function getUser(id) {
  return getById(users, id);
}
