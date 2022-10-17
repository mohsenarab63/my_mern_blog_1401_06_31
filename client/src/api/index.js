import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:5001'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });
  

export const createPost =   (new_post) =>  API.post('/posts', new_post)
export const fetchPost =   (page) =>  API.get(`/posts?page=${page}`)
export const fetchSinglePost =   (id) =>  API.get(`/posts/${id}`)
export const deletePost =   (id) =>  API.delete(`/posts/${id}`)
export const likePostAction =   (postId) =>  API.patch(`/posts/${postId}/likePost`)
export const commentPost = (comment,id)=>API.post(`/posts/${id}/comment`,{comment})

export const signIn =   (formData) =>  API.post(`/users/signin`,formData)
export const signUp =   (formData) =>  API.post(`/users/signup`,formData)