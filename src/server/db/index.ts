import * as mysql from 'mysql';
import Table from 'tablecrud';

import pool from './pool';
import GetBlogsAuthors from './queries/GetBlogsAuthors';

export const Queries = {
    GetBlogsAuthors
}

export const Blogs = new Table<IBlog>(pool, 'blogs', {
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

export const Users = new Table<IUser>(pool, 'users', {
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

export const AccessTokens = new Table<IAccessToken>(pool, 'accesstokens', {
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