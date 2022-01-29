import { User } from '../models/User';

export interface ReqCreateUserDto {
    user: User;
}

export interface ResLoginUserDto {
    user: User;
}
