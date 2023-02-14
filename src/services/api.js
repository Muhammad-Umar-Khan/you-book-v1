import axios from "axios";

export const getData = async (searchTerm) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/users?q=${searchTerm}`
  );
};

export const getPostsForUserDesc = async (userId, page) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=DESC&userId=${userId}&_limit=5&_page=${page}`
  );
};

export const getPostsForUserAsc = async (userId, page) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_sort=id&_order=ASC&userId=${userId}&_limit=5&_page=${page}`
  );
};
export const getPostComments = async (postId) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
};

export const updateUser = async (userId, data) => {
  return await axios.put(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
    data
  );
};

export const getAllUsers = async () => {
  return await axios.get("https://jsonplaceholder.typicode.com/users");
};


