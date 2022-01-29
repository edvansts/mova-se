import Cookies from 'js-cookie';
import { isNullOrUndefined } from 'util';

const defaultKey = 'move-it_';

class CookieAdapter {
    static get<T = string>(key: string): T | null {
        const value: string | undefined = Cookies.get(`${defaultKey}${key}`);

        if (value === undefined) return null;

        const parsedValue: T = JSON.parse(value);

        return parsedValue;
    }

    static getKey(key: string): string {
        const newKey = `${defaultKey}${key}`;

        return newKey;
    }

    static set(key: string, value: NonNullable<any>) {
        try {
            if (typeof value == 'string') {
                Cookies.set(`${defaultKey}${key}`, value);
                return true;
            }
            const valueToAdd = JSON.stringify(value);

            Cookies.set(`${defaultKey}${key}`, valueToAdd);
            return true;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default CookieAdapter;
