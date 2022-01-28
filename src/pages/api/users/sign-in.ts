import { VercelRequest, VercelResponse } from '@vercel/node';
import { UserController } from '../../../controllers/UserController';

const userController = new UserController();

export default async (req: VercelRequest, res: VercelResponse) => {
    switch (req.method) {
        case 'POST':
            return await userController.login(req, res);
        default:
            return res.status(405).end();
    }
};
