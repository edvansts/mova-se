import Cookies from 'js-cookie';

const defaultKey = 'move-it_';
class CookieAdapter {
    static get<T = string>(key: string): T | null {
        const value: T | undefined = Cookies.getJSON(`${defaultKey}${key}`);

        if (value === undefined) return null;

        return value;
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
