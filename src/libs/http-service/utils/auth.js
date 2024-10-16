export const isAuthenticated = () => {
    const token = localStorage.getItem('Token');
    return token !== null;
  };