import FirebaseServer from '../../firebase/ServerApp';
import { User } from '../../models/User';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export class UserService {
    dbInstance: FirebaseFirestore.Firestore;
    authInstance: admin.auth.Auth;
    usersCollection: FirebaseFirestore.CollectionReference;

    constructor() {
        this.dbInstance = FirebaseServer.getDbInstance();
        this.authInstance = FirebaseServer.getAuthInstance();

        this.usersCollection = this.dbInstance
            .collection('users')
            .withConverter(User.getConverter());
    }

    async signUp(user: User, tokenData: DecodedIdToken) {
        try {
            const userAlreadyExists = await this.getByEmail(user.email);

            if (!userAlreadyExists) {
                return await this.create(user);
            }

            const userDoc = await this.getByUid(tokenData.uid);

            if (!userDoc) {
                throw new Error('Usuário não encontrado');
            }

            return {
                user: userDoc.data(),
            };
        } catch (err) {
            throw err;
        }
    }

    async signIn(tokenData: DecodedIdToken) {
        try {
            const userAlreadyExists = await this.getByEmail(tokenData.email);

            if (!userAlreadyExists) {
                throw new Error('Usuário não existe');
            }

            const userDoc = await this.getByUid(tokenData.uid);

            if (!userDoc) {
                throw new Error('Usuário não encontrado');
            }

            return {
                user: userDoc.data(),
            };
        } catch (err) {
            throw err;
        }
    }

    async create(user: User) {
        try {
            const userRef = await this.usersCollection.add(user);
            const userDoc = await userRef.get();

            return {
                user: userDoc.data() as User,
            };
        } catch (err) {
            throw err;
        }
    }

    async getByEmail(email: string) {
        const user = await this.usersCollection
            .where('email', '==', email)
            .get();

        if (user.docs.length === 0) {
            return null;
        }

        return user.docs[0];
    }

    async getByUid(uid: string) {
        const user = await this.usersCollection.where('uid', '==', uid).get();

        if (user.docs.length === 0) {
            return null;
        }

        return user.docs[0];
    }

    async generateToken(id: string) {
        const token = await this.authInstance.createSessionCookie(id, {
            expiresIn: 1209600000,
        });

        return token;
    }

    async validateIdToken(token: string) {
        const tokenData = await this.authInstance.verifyIdToken(token);

        return tokenData;
    }

    async validateSessionToken(token: string) {
        const tokenData = await this.authInstance.verifySessionCookie(token);

        return tokenData;
    }
}
