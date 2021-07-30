export const getUserId = () => JSON.parse(localStorage.getItem('userId'));

export const getAuthHeader = () => {
  const userId = getUserId();
  const auth = userId && userId.token ? { Authorization: `Bearer ${userId.token}` } : {};
  return auth;
};
