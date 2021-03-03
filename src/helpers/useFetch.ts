type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function useFetch(method: Method, url: string, body?: Object) {
    const myHeaders = new Headers();

    const myInit: RequestInit = {
        method: method,
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
    };

    if (method != 'GET' && body) {
        const bodyInit = JSON.stringify(body);

        myInit['body'] = bodyInit;
    }

    const myRequest = new Request(url, myInit);

    const response = await fetch(myRequest);

    console.log(response);
}

export default useFetch;
