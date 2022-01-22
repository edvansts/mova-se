import Cookies from 'js-cookie';

const defaultKey = 'move-it_';

class CookieAdapter {
    static get(key: string) {
        const value = Cookies.get(`${defaultKey}${key}`);

        if (!value) return null;

        return JSON.parse(value);
    }

    static set(key: string, value: NonNullable<any>) {
        try {
            const valueToAdd = JSON.stringify(value);

            Cookies.set(`${defaultKey}${key}`, valueToAdd);

            return value;
        } catch (err) {
            throw new Error(err);
        }
    }
}

export default CookieAdapter;
