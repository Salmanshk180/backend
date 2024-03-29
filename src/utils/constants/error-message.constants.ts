export const ERROR_MESSAGE = {
    _NotFound(str: string) {
      return `${str} is not found`;
    },
    _NotMatch(str: string) {
      return `${str} is not match`;
    },
    _Internal_Server_Error() {
      return `Internal Server Error`;
    },
    _Bad_Request() {
      return `Could not understand the request because of invalid syntax`;
    },
    _Conflict(str: string) {
      return `${str} already exists`;
    },
    _Unauthorized_Access() {
      return `Unauthorized access`;
    },
  };