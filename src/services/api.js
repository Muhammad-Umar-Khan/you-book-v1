import axios from "axios";

export const getDataRequest = (searchTerm) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`
  );
};

export const postsForUserRequest = (userId, page, order) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${order}&userId=${userId}&_limit=5&_page=${page}`
  );
};

export const postCommentsRequest = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

export const updateUserRequest = (data) => {
  return axios.put(
    `https://jsonplaceholder.typicode.com/users/${data?.id}`,
    data
  );
};

export const allUsersRequest = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

export const newUserRequest = (data) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, data);
};

export const deleteUserRequest = (userId) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
};

export const userDetailsRequest = (userId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
};
