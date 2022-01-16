import { VercelRequest, VercelResponse } from '@vercel/node';
import { ServerError } from '../models/ServerError';
import { User } from '../models/User';
import { UserService } from '../services/server/UserService';

export class UserController {
    private _userService: UserService;

    constructor() {
        this._userService = new UserService();
    }

    async createUser(req: VercelRequest, res: VercelResponse) {
        try {
            const { body } = req;

            if (!body || !body.token || !body.user) {
                throw new Error('Dados inválidos');
            }

            const tokenId = body.token as string;
            const dtoUser = new User(body.user);

            const result = await this._userService.login(dtoUser, tokenId);

            if (result) {
                res.json(result);
            } else {
                res.status(400).json(new ServerError('Erro ao criar usuário'));
            }
        } catch (err) {
            console.log(err);
            return res.status(400).json(new ServerError(err));
        }
    }
}
