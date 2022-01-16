import { VercelRequest, VercelResponse } from '@vercel/node';
import { UserController } from '../../../controllers/UserController';

const userController = new UserController();

export default async (req: VercelRequest, res: VercelResponse) => {
    const { body } = req;

    if (!body || !body.token || !body.user) {
        throw new Error('Dados inválidos');
    }

    switch (req.method) {
        case 'POST':
            return await userController.createUser(req, res);
        default:
            return res.status(405).end();
    }
};
