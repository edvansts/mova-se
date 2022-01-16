import { AxiosResponse } from 'axios';
import { User } from '../models/User';
import AxiosMain from './AxiosMain';

export const Requests = {
    user: {
        getUser: (userId: string) => {
            return AxiosMain.get<AxiosResponse<User>>(`/users/${userId}`);
        },
        getUsers: () => {
            return AxiosMain.get<AxiosResponse<User[]>>(`/users`);
        },
        createUser: (user: User) => {
            return AxiosMain.post<AxiosResponse<User>>(`/users`, { user });
        },
    },
};
