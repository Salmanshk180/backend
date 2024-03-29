import { DataSource } from "typeorm"

export const connection = new DataSource({
    type: "postgres",
    host:  process.env.DATABASE_HOST,
    port:  Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASENAME,
    schema: process.env.DATABASE_SCHEMA,
})
