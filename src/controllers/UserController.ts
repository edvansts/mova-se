import { VercelRequest, VercelResponse } from '@vercel/node';
import { ServerError } from '../models/ServerError';
import { User } from '../models/User';
import { UserService } from '../services/server/UserService';

export class UserController {
    private _userService: UserService;

    constructor() {
        this._userService = new UserService();
    }

    async validaToken(token: string) {
        const tokenDecoded = await this._userService.validateIdToken(token);

        if (!tokenDecoded) {
            throw new Error('Token inválido');
        }

        return tokenDecoded;
    }

    async createUser(req: VercelRequest, res: VercelResponse) {
        try {
            const { body } = req;

            const tokenDecoded = await this.validaToken(
                req.headers.authorization,
            );

            if (!body || !body.user) {
                throw new Error('Dados inválidos');
            }

            const dtoUser = new User(body.user);

            const result = await this._userService.signUp(
                dtoUser,
                tokenDecoded,
            );

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

    async login(req: VercelRequest, res: VercelResponse) {
        try {
            const tokenDecoded = await this.validaToken(
                req.headers.authorization,
            );

            const result = await this._userService.signIn(tokenDecoded);

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
