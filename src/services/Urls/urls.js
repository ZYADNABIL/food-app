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
    GET_USERS :`/Users/`,
    CHANGE_PASS:`/Users/ChangePassword`,
    REGISTER : `/Users/Register`,
    VERIFY : `/Users/verify`,
    GET_USER : (id)=> `/Users/${id}`,
    DELETE_USER :(id)=>`/Users/${id}`,
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
    GET_RECIEPE: (recipeId)=> `/Recipe/${recipeId}`,
    CREATE_RECIEPE:`/Recipe/`,
    DELETE_RECIEPE:(id)=>`/Recipe/${id}`,
    UPDATE_RECIEPE :(recipeId)=> `/Recipe/${recipeId}`
}
//User_reciepes Urls
export const USER_RECIEPE_URLS ={
    GET_FAVS:`/userRecipe/`,
    REMOVE_FROM_FAVS: (recipeId)=> `/userRecipe/${recipeId}`,
    ADD_TO_FAVS:`/userRecipe/`,
}
//tags Urls
export const TAGS_URLS ={
    GET_TAGS:`/tag/`
}