export const validator = (routeID) => {
  if (typeof routeID !== "string") {
    return false;
  }

  if (routeID.trim() !== routeID) {
    return false;
  }

  if (routeID <= 1 && routeID >= 100) {
    return false;
  }

  return true;
};
