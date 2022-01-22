import { User } from '../models/User';

export interface ReqLoginUserDto {
    user: User;
    token: string;
}

export interface ResLoginUserDto {
    user: User;
    token: string;
}
