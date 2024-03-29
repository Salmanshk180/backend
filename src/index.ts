import dotenv from "dotenv"
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routers/routes';
import { connection } from './database/database.configuration';
const app = express();
const PORT = process.env.SERVER_PORT;
app.use(bodyParser.json());
app.use("/", router)
connection.initialize().then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);

})


