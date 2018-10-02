//For development, copy this export statement into a file named development.ts 
//and replace the process.env variables with your development settings

export default {
    mysql: {
        connectionLimit: process.env.DB_CONN_LIMIT || 10,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST,
        database: process.env.DB_DBNAME
    },
    auth: {
        secret: process.env.SECRET
    }
}