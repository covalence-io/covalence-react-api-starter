import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

import config from '../../config';
import { AccessTokens } from '../../db';

export const CreateToken = async (payload: IPayload) => {

    //Get a new tokenid from the database to put into the jwt for lookup when verifying
    let tokenid = await AccessTokens.insert({
        userid: payload.userid
    });

    payload.accesstokenid = tokenid.id;
    payload.unique = crypto.randomBytes(32).toString('hex');
    let token = await jwt.sign(payload, config.auth.secret);
    
    await AccessTokens.update(tokenid.id, {
        token: token
    });

    return token;
};

export const ValidateToken = async (token: string) => {

    let payload: IPayload = <IPayload>jwt.decode(token);
    let accesstoken = await AccessTokens.findOne({ id: payload.accesstokenid, token: payload.token});

    if(accesstoken.expires > new Date()) {
        let expiration = new Date();
        expiration.setDate(expiration.getDate() + 30); //Extend the token 30 days
        AccessTokens.update(payload.accesstokenid, {
            expires: expiration
        });
        payload.expiration = expiration;
        return payload;
    } else {
        throw new Error('Invalid token');
    }
};

interface IPayload { 
    [key: string]: any;
    userid: number;
    unique?: string;
}