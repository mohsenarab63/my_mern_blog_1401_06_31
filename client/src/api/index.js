import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:5001'})

export const createPost =   (new_post) =>  API.post('/posts', new_post)
export const fetchPost =   (page) =>  API.get(`/posts?page=${page}`)
export const deletePost =   (id) =>  API.delete(`/posts/${id}`)


export const signIn =   (formData) =>  API.post(`/users/signin`,formData)
export const signUp =   (formData) =>  API.post(`/users/signup`,formData)