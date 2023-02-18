export const getUserObject = (updatedUser) => ({
  id: updatedUser?.id || "",
  name: updatedUser?.name || "",
  username: updatedUser?.username || "",
  email: updatedUser?.email || "",
  address: {
    street: updatedUser?.address?.street || "",
    suite: updatedUser?.address?.suite || "",
    city: updatedUser?.address?.city || "",
  },
});
