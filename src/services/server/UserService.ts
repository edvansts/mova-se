import { VercelRequest, VercelResponse } from '@vercel/node';
import FirebaseServer from '../../firebase/ServerApp';
import { ServerError } from '../../models/ServerError';
import { User } from '../../models/User';

export class UserService {
    dbInstance: FirebaseFirestore.Firestore;

    constructor() {
        this.dbInstance = FirebaseServer.getInstance();
    }

    async createUser(req: VercelRequest, res: VercelResponse) {
        try {
            const { body } = req;

            const user = new User(body.user);

            const userAlreadyExists = !!this.getUserByEmail(user.email);

            if (userAlreadyExists) {
                return res.json(new ServerError('Usuário já existe.'));
            }

            const usersCollection = this.dbInstance.collection('users');

            const userDoc = await usersCollection.add(user);

            const userAdded = await userDoc.get();

            return res.json(userAdded.data());
        } catch (err) {
            return res.status(400).json(new ServerError(err));
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.dbInstance
            .collection('users')
            .where('email', '==', email)
            .get();

        if (user.docs.length === 0) {
            return null;
        }

        if (user.docs.length > 1) {
            throw new ServerError('Email inválido');
        }

        return user.docs[0];
    }
}
