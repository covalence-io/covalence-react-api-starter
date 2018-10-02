import * as mysql from 'mysql';
import Table from './table';

export const Blogs = new Table<IBlog>('blogs', {
    id: mysql.Types.INT24,
    authorid: mysql.Types.INT24,
    title: mysql.Types.VARCHAR,
    body: mysql.Types.VARCHAR,
    publishedts: mysql.Types.DATETIME,
    __created: mysql.Types.DATETIME
});

export interface IBlog {
    id?: number;
    authorid?: number;
    title?: string;
    body?: string;
    publishedts: Date;
    __created: Date;
}

export const Users = new Table<IUser>('users', {
    id: mysql.Types.INT24,
    email: mysql.Types.VARCHAR,
    password: mysql.Types.VARCHAR,
    firstname: mysql.Types.VARCHAR,
    lastname: mysql.Types.VARCHAR,
    role: mysql.Types.VARCHAR,
    __created: mysql.Types.DATETIME
});

export interface IUser {
    id?: number;
    email?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    role?: string;
    __created?: Date;
}

export const AccessTokens = new Table<IAccessToken>('accesstokens', {
    id: mysql.Types.INT24,
    userid: mysql.Types.INT24,
    token: mysql.Types.VARCHAR,
    expires: mysql.Types.DATETIME,
    __created: mysql.Types.DATETIME
});

export interface IAccessToken {
    id?: number;
    userid?: number;
    token?: string;
    expires?: Date;
    __created?: Date;
}