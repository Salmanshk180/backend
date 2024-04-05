import 'reflect-metadata'
import dotenv from "dotenv"
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routers/routes';
import { AppDataSource } from './database/database.configuration';
import cors from "cors";
import cookieParser from "cookie-parser"
const app = express();
const PORT = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use("/", router)
AppDataSource.initialize().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);

})


