import axios from 'axios';


const API = axios.create({ baseURL: 'https://enigmatic-dusk-69987.herokuapp.com/api/v1' });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`;
    }
  
    return req;
});

export const getTweets = async () => {

    try{
        const {data} = await API.get('/tweet');
        return data.tweets
    }catch (error) {
        console.log(error);
      }
};
export const createTweet =  (tweet) =>  API.post('/tweet/create-tweet', tweet);
// localhost:5000/api/v1/tweet/61a2aab2d31950eaf18925ce/comment
export const createComment = (comment, tweet) => API.post(`/tweet/${tweet}/comment`, comment)
export const deleteTweet = (tweet) => API.delete(`/tweet/${tweet}`)
export const updateTweet = (data,tweet) => API.put(`/tweet/${tweet}`,data)
export const tweetAction = (tweet, action) => API.post(`/tweet/${tweet}/action`)
export const getUser = async () => await API.post('/auth/getUser')


