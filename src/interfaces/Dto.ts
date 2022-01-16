import { User } from '../models/User';

export interface LoginUserDto {
    user: User;
    token: string;
}
