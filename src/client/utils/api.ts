import * as fetch from 'isomorphic-fetch';

export let AccessToken:string = localStorage.getItem('token') || null;
export let User: any = {
    userid: localStorage.getItem('userid') || null,
    role: localStorage.getItem('role') || null
};

export const json = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers: any = {
        'Content-Type': 'application/json'
    }

    if(AccessToken) {
        headers['Authorization'] = `Bearer ${AccessToken}`;
    }

    try {
        let result = await fetch(uri, {
            method,
            headers,
            body: JSON.stringify(body)
        });
        if(result.ok) {
            return <T>(await result.json());
        } else {
            return false;
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
}

export const SetAccessToken = (token: string, user: {} = { userid: undefined, role: 'guest' }) => {
    AccessToken = token;
    User = user;

    localStorage.setItem('token', token);
    localStorage.setItem('role', User.role);
    localStorage.setItem('userid', User.userid);
}

export default json;