const users = [];

function findUserbyEmail(email) {
    return users.find(user=> user.email === email);
}

function addUser(user) {
    users.push(user);
}

module.exports = {
    users,
    findUserbyEmail,
    addUser
}