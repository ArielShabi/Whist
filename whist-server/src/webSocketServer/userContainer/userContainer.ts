import uniqid from 'uniqid';
import { getRandomName } from '../../utils';
import { User } from './types';

const userContainer = () => {
    let users: User[] = [];

    const addUser = (connection: WebSocket): string => {
        const id: string = uniqid();
        const name = getRandomName();

        users.push({
            id,
            connection,
            name
        });

        return id;
    };

    const removeUser = (id: string): boolean => {
        const numberOfUsers = users.length;
        users = users.filter(user => user.id !== id);
        return numberOfUsers !== users.length;
    }

    const editUser = (id: string, newUserData: Partial<User>): User => {
        const userToEditIndex = users.findIndex(user => user.id === id);
        const userToEdit = users[userToEditIndex];
        users[userToEditIndex] = { ...userToEdit, ...newUserData };
        return users[userToEditIndex];
    }

    const getUser = (id: string): User => {
        return users.find(user => user.id === id)
    };

    const getAllOpenUsers = (idToExclude: string): User[] => {
        return users.filter(user => user.id != idToExclude && user.connection.readyState == WebSocket.OPEN);
    }

    return {
        addUser,
        removeUser,
        editUser,
        getUser,
        getAllOpenUsers,
    };
}

export default userContainer;
