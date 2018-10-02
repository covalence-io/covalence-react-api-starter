import * as fetch from 'isomorphic-fetch';

let AccessToken:string;
let Role: string = 'guest';

export default async (uri: string, method: string = 'GET', body?: {}) => {

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

export const SetAccessToken = (token: string, role: string = 'guest') => {
    AccessToken = token;
    Role = role;
}