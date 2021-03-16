import { connectToDatabase } from '.';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { useRouter } from 'next/router';

export default async (req: VercelRequest, res: VercelResponse) => {
    const database = await connectToDatabase();
    const { query } = req;

    const refData = database.ref().child(`users`).child(`${query.id}`);

    return new Promise<void>((resolve, reject) => {
        refData
            .get()
            .then(response => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'max-age=30');
                res.end(JSON.stringify(response));
                resolve();
                // return res.status(200).json(response.val());
            })
            .catch(error => {
                res.json(error);
                res.status(405).end();
                return resolve();
            });
    });
};
