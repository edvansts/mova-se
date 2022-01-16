import { AxiosResponse } from 'axios';
import { LoginUserDto } from '../../interfaces/Dto';
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
        loginUser: (data: LoginUserDto) => {
            return AxiosMain.post<AxiosResponse<User>>(`/users`, { ...data });
        },
    },
};
