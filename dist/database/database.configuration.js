"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const database_constants_1 = require("../utils/constants/database.constants");
const users_1 = require("../entities/users/users");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: database_constants_1.databse_host,
    port: database_constants_1.database_port,
    username: database_constants_1.database_username,
    password: database_constants_1.database_password,
    database: database_constants_1.database_name,
    schema: database_constants_1.database_schema,
    entities: [users_1.Users],
    // synchronize: true,
    logging: true,
    migrations: ["src/migrations/*.ts"],
});
