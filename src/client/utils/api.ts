import * as fetch from 'isomorphic-fetch';

let AccessToken:string;

export let User: any = {};

export const json = async (uri: string, method: string = 'GET', body?: {}) => {

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
            return await result.json();
        } else {
            return false;
        }
    } catch(e) {
        console.log(e);
        throw e;
    }
}

export const SetAccessToken = (token: string, user: {} = { role: 'guest' }) => {
    AccessToken = token;
    User.role = user;
}

export default json;