import { AxiosResponse } from 'axios';
import { CreateUserDto } from '../../interfaces/Dto';
import { User } from '../../models/User';

import AxiosMain from './AxiosMain';

export const Requests = {
    user: {
        getUser: (userId: string) => {
            return AxiosMain.get<AxiosResponse<User>>(`/users/${userId}`);
        },
        getUsers: () => {
            return AxiosMain.get<AxiosResponse<User[]>>(`/users`);
        },
        createUser: (data: CreateUserDto) => {
            return AxiosMain.post<AxiosResponse<User>>(`/users`, { ...data });
        },
    },
};
