import uniqid from 'uniqid';
import { User, UserContainer } from './types';
import WebSocketClient from '../webSocketClient';
import { getRandomName } from '../../utils';

const createUserContainer = (preAddedUsers: User[] = []): UserContainer => {
    let users: User[] = [...preAddedUsers];

    const addUser = (connection: WebSocket): string => {
        const id: string = uniqid();
        const name = getRandomName();

        const userInfo = { id, name };

        users.push({
            ...userInfo,
            connection: new WebSocketClient(connection, userInfo),
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

    const getAllOpenUsers = (idToExclude?: string): User[] => {
        return users.filter(user => user.id != idToExclude && user.connection.isReady);
    }

    return {
        addUser,
        removeUser,
        editUser,
        getUser,
        getAllOpenUsers,
    };
}

export default createUserContainer;
