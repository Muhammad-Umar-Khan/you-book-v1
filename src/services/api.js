import axios from "axios";

export const getData = (searchTerm) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`
  );
};

export const getPostsForUserDesc = (userId, page) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=DESC&userId=${userId}&_limit=5&_page=${page}`
  );
};

export const getPostsForUserAsc = (userId, page) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=ASC&userId=${userId}&_limit=5&_page=${page}`
  );
};
export const getPostComments = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

export const updateUser = (userId, data) => {
  return axios.put(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    data
  );
};

export const getAllUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

export const createNewUser = (data) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, data);
};

export const deleteUserRequest = (userId) => {
  return axios.delete(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
};

export const getUserDetailsRequest = (userId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
};
