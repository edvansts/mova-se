import { User } from '../models/User';

export interface CreateUserDto {
    user: User;
    token: string;
}
