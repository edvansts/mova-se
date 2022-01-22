import { AxiosResponse } from 'axios';
import { ReqLoginUserDto, ResLoginUserDto } from '../../interfaces/Dto';
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
        loginUser: (data: ReqLoginUserDto) => {
            return AxiosMain.post<ResLoginUserDto>(`/users`, {
                ...data,
            });
        },
    },
};
