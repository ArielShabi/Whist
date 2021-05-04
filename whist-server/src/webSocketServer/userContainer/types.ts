import { IWebSocketClient } from '../types';
import { UserInfo } from '../../types';

export type User = UserInfo & {
    connection: IWebSocketClient;
};

export interface UserContainer {
    addUser: (user: WebSocket) => string,
    removeUser: (id: string) => boolean,
    editUser: (id: string, newUserData: Partial<User>) => User,
    getUser: (id: string) => User,
    getAllOpenUsers: (idToExclude?: string) => User[]
};
