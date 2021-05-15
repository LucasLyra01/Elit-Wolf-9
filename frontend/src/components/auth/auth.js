// export const TOKEN_KEY = localStorage;
// export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
// export const getToken = () => localStorage.getItem(TOKEN_KEY);
// export const login_token = token => {
//     localStorage.setItem(TOKEN_KEY, token);
// };
// export const logout = () => {
//     localStorage.removeItem(TOKEN_KEY);
// };

const TOKEN_KEY = localStorage;

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY);
  
export const loginToken = (token_novo) => {
    localStorage.setItem(TOKEN_KEY, token_novo);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};
