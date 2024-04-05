import axios from "axios";
import addDeleteGetLocalStorage from "./addDeleteGetLocalStorage";
import { STORAGE } from "../common/LocalVariable";
import { AXIOS_CONSTANT } from "../common/ApiRoutes";

/**
 * @description This function is used to logout the user
 */
export const sessionLogout = async () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/";
};

/**
 * @description This function is used to start the session time
 */
const startSessionTime = () => {
  let time = new Date().getTime().toString();
  addDeleteGetLocalStorage(STORAGE.SESSION_TIME, time, "add", "single");
};

/**
 * @description This function is used to get the third party request
 */
export const getThirdPartyRequest = async (url) => {
  startSessionTime();
  if (url !== undefined) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
};

const globalRequest = (
  url,
  method = "get",
  data = {},
  options = {},
  token = false
) => {
  //gloabl axios request for post get put and delete

  let headers = {
    "x-api-key": AXIOS_CONSTANT.API_KEY,
  };
  //in this application we are using cookies to store the token managing from backend so we are not using local storage
  // if (token) {
  //   let json = {};
  //   const data = addDeleteGetLocalStorage(STORAGE.USER_TOKEN, {}, "get");
  //   try {
  //     json = JSON.parse(data);
  //   } catch (e) {
  //     json = {};
  //   }
  //   headers.authorization = "Bearer " + json?.token;
  // }
  let sendData = {
    method: method,
    // url: AXIOS_CONSTANT.BASE_URL + url,
    url: url,
    headers: headers,
    ...options,
  };

  if (data) {
    sendData.data = data;
  }

  startSessionTime(); //start session time
  return new Promise((resolve, reject) => {
    axios(sendData)
      .then((response) => {
        if (response?.data?.status === 401) {
          sessionLogout();
        }
        resolve(response.data);
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          sessionLogout();
        }
        reject(err);
      });
  });
};

export default globalRequest;
