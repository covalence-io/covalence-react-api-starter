import pool from '../pool';

export default () => { 
    return new Promise<IQueryGetBlogsAuthorsResult>((resolve, reject) => {
        pool.query(`SELECT 
            b.id, b.title, b.publishedts, u.firstname, u.lastname
            FROM blogs b join users u on b.authorid = u.id;`, (err, results) => {
            if(err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export interface IQueryGetBlogsAuthorsResult {
    id: number;
    title: string;
    publishedts: Date;
    firstname: string;
    lastname: string;
}