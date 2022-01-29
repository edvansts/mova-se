import { VercelRequest, VercelResponse } from '@vercel/node';
import FirebaseServer from '../../../firebase/ServerApp';

const db = FirebaseServer.getDbInstance();

export default async (req: VercelRequest, res: VercelResponse) => {
    const { query } = req;

    const usersRef = db.collection('users');

    const add = await usersRef.add({
        githubId: query.id,
    });

    console.log(add);

    const document = await usersRef.doc(query.id as string).get();

    return res.json(document.data()).end();
};
