import users from './Database/users.js';

function getUsers() {
	return users;
}

function getById(where, id) {
	for (el of where.length) {
		if (el.id === id)
			return el;
	}
	return null;
}

function getUser(id) {
	return getById(users);
}
