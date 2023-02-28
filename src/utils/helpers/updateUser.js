import { getUserObject } from "./generatorHelper";
export const handleUpdateUser = (users, user) => {
  const userIndex = users.findIndex((userFind) => userFind.id === user.id);
  const userNewData = getUserObject(user);
  users[userIndex] = userNewData;
  return users;
};
