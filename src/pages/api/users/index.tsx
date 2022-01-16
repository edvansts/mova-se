import { VercelRequest, VercelResponse } from '@vercel/node';
import { UserService } from '../../../services/server/UserService';

const userService = new UserService();

export default async (req: VercelRequest, res: VercelResponse) => {
    switch (req.method) {
        case 'POST':
            return await userService.createUser(req, res);
        default:
            return res.status(404).end();
    }
};
