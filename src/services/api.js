import axios from "axios";

export const getData = (search) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/users?q=${search}`
  );
};

export const postsForUser = (userId, page, order) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=${order}&userId=${userId}&_limit=5&_page=${page}`
  );
};

export const postComments = (postId) => {
  return axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

export const updateUser = (data) => {
  return axios.put(
    `https://jsonplaceholder.typicode.com/users/${data?.id}`,
    data
  );
};

export const allUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

export const newUser = (data) => {
  return axios.post(`https://jsonplaceholder.typicode.com/users`, data);
};

export const deleteUser = (userId) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
};

export const userDetails = (userId) => {
  return axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
};
