"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MESSAGE = void 0;
exports.ERROR_MESSAGE = {
    _NotFound(str) {
        return `${str} is not found`;
    },
    _NotMatch(str) {
        return `${str} is not match`;
    },
    _Internal_Server_Error() {
        return `Internal Server Error`;
    },
    _Bad_Request() {
        return `Could not understand the request because of invalid syntax`;
    },
    _Conflict(str) {
        return `${str} already exists`;
    },
    _Unauthorized_Access() {
        return `Unauthorized access`;
    },
};
