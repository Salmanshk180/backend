import dotenv from "dotenv"
dotenv.config();

export const databse_host= process.env.DATABASE_HOST
export const database_port= Number(process.env.DATABASE_PORT)
export const database_username= process.env.DATABASE_USERNAME
export const database_password= process.env.DATABASE_PASSWORD
export const database_name= process.env.DATABASE_DATABASENAME
export const database_schema= process.env.DATABASE_SCHEMA