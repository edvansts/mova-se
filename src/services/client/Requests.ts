import { AxiosResponse } from 'axios';
import { ReqCreateUserDto, ResLoginUserDto } from '../../interfaces/Dto';
import { User } from '../../models/User';

import AxiosMain from './AxiosMain';

export const Requests = {
    user: {
        getUser: (userId: string) => {
            return AxiosMain.get<User>(`/users/${userId}`);
        },
        getUsers: () => {
            return AxiosMain.get<User[]>(`/users`);
        },
        createUser: (data: ReqCreateUserDto) => {
            return AxiosMain.post<ResLoginUserDto>(`/users/sign-up`, {
                ...data,
            });
        },
        loginUser: () => {
            return AxiosMain.post<ResLoginUserDto>(`/users/sign-in`);
        },
    },
};
