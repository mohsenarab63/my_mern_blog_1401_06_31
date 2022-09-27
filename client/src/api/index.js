import axios from 'axios'


const API = axios.create({baseURL:'http://localhost:5000'})

export const createPost =   (new_post) =>  API.post('/posts', new_post)
export const fetchPost =   () =>  API.get('/posts')