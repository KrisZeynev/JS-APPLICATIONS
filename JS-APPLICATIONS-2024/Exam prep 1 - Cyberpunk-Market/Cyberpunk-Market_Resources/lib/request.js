// import { expect } from "chai";

import { getUserData } from "../utils/userUtils.js";

const baseUrl = "http://localhost:3030/users";
// export const register = async (email, password) => {
//   const res = await fetch(`${baseUrl}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = res.json();

//   return data;
// };

// export const login = async (email, password) => {
//   const res = await fetch(`${baseUrl}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });

//   const data = res.json();

//   return data;
// };

export const request = async (method, url, data) => {
  const { accessToken } = getUserData();
  let requestOptions = {};

  if (data) {
    requestOptions.headers = {
      "Content-Type": "application/json",
    };
    requestOptions.body = JSON.stringify(data);
  }

  if (accessToken) {
    requestOptions.headers = {
      ...requestOptions.headers,
      "X-Authorization": accessToken,
    };
  }

  if (method !== "GET") {
    requestOptions.method = method;
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw response.json();
  }

  if (response.status === 204) {
    return
  }

  const res = response.json();

  return res;
};
