/**
 * this file contains all the api routes
 */

export const AXIOS_CONSTANT = {
  BASE_URL: "http://localhost:4000/api/",
  API_KEY: "",
};

export const API_ROUTES = {
  //auth routes
  SIGN_UP: "api/auth/signup",
  LOGIN: "api/auth/login",
  LOGOUT: "api/auth/logout",
  //conversation routes
  GET_CONVERSATIONS: "api/users",
  SEND_MESSAGE: (id) => `api/messages/send/${id}`,
  GET_MESSAGES: (id) => `api/messages/${id}`,
};
