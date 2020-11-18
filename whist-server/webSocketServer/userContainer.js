const WebSocket = require('ws');
const uniqid = require('uniqid');
const { getRandomName } = require('../utils');

const userContainer = () => {
    let users = [];

    const addUser = connection => {
        const id = uniqid();
        const name = getRandomName();
        users.push({
            id,
            connection,
            name
        })
        return id;
    };

    const removeUser = id => {
        users = users.filter(user => user.id !== id);
    }

    const editUser = (id, newUserData) => {
        const userToEditIndex = users.findIndex(user => user.id === id);
        const userToEdit = users[userToEditIndex];
        users[userToEditIndex] = { ...userToEdit, ...newUserData };
        return users[userToEditIndex];
    }

    const getUser = (id) => users.find(user => user.id === id);

    const getAllOpenUsers = (idToExclude) => users.filter(user => user.id != idToExclude && user.connection.readyState == WebSocket.OPEN);

    return {
        addUser,
        removeUser,
        editUser,
        getUser,
        getAllOpenUsers,
    };
}

module.exports = userContainer;
