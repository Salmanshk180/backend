"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database_schema = exports.database_name = exports.database_password = exports.database_username = exports.database_port = exports.databse_host = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.databse_host = process.env.DATABASE_HOST;
exports.database_port = Number(process.env.DATABASE_PORT);
exports.database_username = process.env.DATABASE_USERNAME;
exports.database_password = process.env.DATABASE_PASSWORD;
exports.database_name = process.env.DATABASE_DATABASENAME;
exports.database_schema = process.env.DATABASE_SCHEMA;
