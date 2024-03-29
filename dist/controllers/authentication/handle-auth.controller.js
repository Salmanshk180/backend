"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleSignup = void 0;
const signup_services_1 = require("../../services/authentication/signup.services");
const handleSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const response = yield (0, signup_services_1.signup)(req, res);
    return res.status(response.statusCode).json({ message: response.message, id: (_a = response.data) === null || _a === void 0 ? void 0 : _a.id });
});
exports.handleSignup = handleSignup;
