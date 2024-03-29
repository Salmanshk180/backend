"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const handle_auth_controller_1 = require("../controllers/authentication/handle-auth.controller");
exports.router = (0, express_1.Router)();
exports.router.post("/signup", handle_auth_controller_1.handleSignup);
