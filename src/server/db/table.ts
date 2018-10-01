import * as mysql from 'mysql';
import config from '../config/';

const pool = mysql.createPool(config.mysql);

export default class Table<T> {

    constructor(private tableName: string, private rowTypes: { [K in keyof T]: mysql.Types }) {
        
    }

    all(orderBy?: string): Promise<T[]> {

        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM ${this.tableName} ${orderBy ? 'ORDER BY ' + orderBy : ''}`, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });
    }

    one(id: number): Promise<T> {

        return new Promise((resolve, reject) => {
            pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, id, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results[0]);
                }
            });
        });
    }

    insert(row: T): Promise<{ id: number}> {

        return new Promise((resolve, reject) => {
            pool.query(`insert into ${this.tableName} (${Object.keys(row).map((v) => {
                    return `${v}`;
                })}) VALUES(${Object.keys(row).map((v) => {
                    return `?`;
                })});`,
            this.rowToValueArray(row),
            (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve({id: results.insertId});
                }
            });
        });
    }

    update(id: number, row: T): Promise<number> {

        let vals = this.rowToValueArray(row);
        vals.push(id);

        return new Promise((resolve, reject) => {
            pool.query(`UPDATE ${this.tableName} SET ${Object.keys(row).map((v) => {
                return `${v} = ?`;
            })} WHERE id = ?`,
            vals, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results.affectedRows);
                }
            })
        });
    }

    delete(id: number): Promise<number> {

        return new Promise((resolve, reject) => {
            pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, id, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results.affectedRows);
                }
            });
        });
    }

    // find(row: T) : Promise<mssql.IRecordSet<T>> {

    //     let ps = this.prepareRow(row,new mssql.PreparedStatement(pool));

    //     return ps.prepare(`SELECT * FROM ${this.tableName} WHERE ${Object.keys(row).map((v) => {
    //         return `${v} = @${v}`;
    //     })}`)
    //     .then(() => {
    //         return ps.execute(row)
    //         .then(r => {
    //             this.unprepareStatement(ps);
    //             return r.recordset;
    //         });
    //     }).catch(e => {
    //         console.log(e);
    //         this.unprepareStatement(ps);
    //         return null;
    //     });
    // }

    // findOne(row: T) : Promise<T> {

    //     let ps = this.prepareRow(row,new mssql.PreparedStatement(pool));

    //     return ps.prepare(`SELECT TOP 1 * FROM ${this.tableName} WHERE ${Object.keys(row).map((v) => {
    //         return `${v} = @${v}`;
    //     })}`)
    //     .then(() => {
    //         return ps.execute(row)
    //         .then(r => {
    //             this.unprepareStatement(ps);
    //             return r.recordset.length > 0 ? r.recordset[0] : null;
    //         });
    //     }).catch(e => {
    //         console.log(e);
    //         this.unprepareStatement(ps);
    //         return null;
    //     });
    // }

    // private unprepareStatement(ps: mssql.PreparedStatement) {
    //     ps.unprepare(err => {
    //         if(err) console.log(err);
    //     });
    // }

    private rowToValueArray(row: any): any[] {
        let vals: any[] = [];
        Object.keys(row).map((k) => {
            vals.push(row[k]);
        });
        return vals;
    }
}
