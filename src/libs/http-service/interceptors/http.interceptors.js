import axios from 'axios';

export function configureHeaders() {
    axios.interceptors.request.use(
        (config) => {
            const accessToken = localStorage.getItem('Token');
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
           
            return config;
        },
        (error) => Promise.reject(error),
    );
}

//configure Interceptors
export const configureInterceptors = () => {
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if ((error.response.status === 498 || error.response.status === 401) && !originalRequest._retry) {
                console.log(error, 'error');
                // originalRequest._retry = true;
                // const token = localStorage.getItem("token");
                // const response = await refreshToken({ token });
                // const accessToken = response?.success?.data;
                // if (response.success) {
                //     localStorage.setItem('token', accessToken);
                // }
                // return axios(originalRequest);
            }
            return Promise.reject(error);
        },
    );
}