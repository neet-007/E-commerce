import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
    baseURL:'http://127.0.0.1:8000/api'
}
)

const config = {
    headers: {
      'Accept':'application/json',
      'Content-type':'application/json',
      'X-CSRFToken': Cookies.get('csrftoken')
    }
}

export const CSRFTOKEN = async () => {
    try {
        let res = await api.get('/csrf', {withCredentials:true})
        console.log(res)
        console.log(Cookies.get('csrftoken'))
    } catch (error) {
        console.log(error)
    }
}
export const register = async ({email, username, password, re_password}) => {
    try {
        let res = await api.post('/signup', {email:email, username:username, password:password, re_password:re_password}, config)
        return res.data
    } catch (error) {
        return error.response
    }
}
export const login = async ({email, password}) => {
    try {
        let res = await api.post('/login', {email:email, password:password}, config)
        return res.data
    } catch (error) {
        return error.response
    }
}
export const logout = async () => {
    try {
        let res = await api.post('logout', {}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllItems = async () => {
    try {
        let res = await api.get('/items', config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getSingleItem = async (itemId) => {
    try {
        let res = await axios.get(`/api/single-item/${itemId}`, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addItem = async ({name, description, price, category}) => {
    try {
        let res = await axios.post('/api/items', {name:name, description:description, price:price, category:category}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addCategory = async ({name}) => {
    try {
        let res = await axios.post('/api/create-categories', {name:name}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getItemsFromCategory = async (categoryId) => {
    try {
        let res = await axios.get(`/api/add-item-to-category/${categoryId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addItemToCategory = async ({categoryId, items}) => {
    try {
        let res = await axios.put(`/api/add-item-to-category/${categoryId}`, {items:items}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteItemFromCategory = async ({categoryId, items}) => {
    try {
        let res = await axios.delete(`/api/add-item-to-category/${categoryId}`, {items:items}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const editItem = async ({itemId, name, description, price}) => {
    try {
        let res = await axios.put(`/api/single-item/${itemId}`, {name:name, description:description, price:price}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const deleteItem = async ({itemId}) => {
    try {
        console.log(itemId)
        let res = await axios.delete(`/api/single-item/${itemId}`, {}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addItemToCart = async ({cartItems, cartQuantity}) => {
    try {
        let res = await axios.post('/api/cart', {items:cartItems, quantity:cartQuantity}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}