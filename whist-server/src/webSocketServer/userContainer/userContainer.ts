import uniqid from 'uniqid';
import { getRandomName } from '../../utils';
import { User } from './types';

const userContainer = () => {
    let users: User[] = [];

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

export default userContainer;
