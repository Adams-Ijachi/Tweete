import axios from 'axios';


const API = axios.create({ baseURL: 'https://enigmatic-dusk-69987.herokuapp.com/api/v1' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
  
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register',formData)
export const logout =  () => API.post('/auth/logout')
export const getUser = async () => await API.post('/auth/getUser')
export const createComment = (tweet,comment) => API.post('/')


