import axios from "axios"
const baseUrl = 'https://upskilling-egypt.com:3006/api/v1'
export const imageUrl = 'https://upskilling-egypt.com:3006' ;  

export const axiosInstance = axios.create({ baseURL:baseUrl,
    headers : {Authorization:localStorage.getItem("token")}
 })
//user urls
export const USERS_URLS = {
    LOGIN:`/Users/Login`,
    RESET_REQUEST:`/Users/Reset/Request`,
    RESET:`/Users/Reset`,
    GET_USER : (id)=>`/Users/${id}`
}
//category urls
export const CATEGORY_URLS ={
    GET_CATEGORIES:`/Category/`,
    DELETE_CATEGORY: (id)=> `/Category/${id}`,
    UPDATE_CATEGORY: (id)=> `/Category/${id}`,
    ADD_CATEGORY:`/Category/`
}
//reciepes Urls
export const RECIEPE_URLS ={
    GET_RECIEPES:`/Recipe/`,
    DELETE_RECIEPE:(id)=>`/Recipe/${id}`
}