import axios from 'axios'
import Cookies from 'js-cookie'
axios.defaults.withCredentials
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
        console.log(res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getAllItems = async () => {
    try {
        let res = await axios.get('/api/items', config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const serachAllItems = async (searchValue) => {
    try {
        let res = await axios.get(`/api/items?search=${searchValue}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const searchSomeItems = async (searchValue) => {
    try {
        let res = await axios.get(`/api/items?searchbar=${searchValue}`)
        return res.data
    } catch(error){
        console.log(error)
    }
}
export const getHomeItems = async () => {
    try {
        let res = await axios.get('/api', config)
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
export const getItemsFromCategory = async ({categoryId, filter}) => {
    try {
        let res = await axios.get(`/api/add-item-to-category/${categoryId}?f=${filter}`)
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
export const getCartItems = async () => {
    try {
        let res = await axios.get('/api/cart', config)
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
export const addItemToCart1 = async ({cartItems, cartQuantity}) => {
    try {
        let res = await axios.put('/api/cart', {items:cartItems, quantity:cartQuantity}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const removeItemFromCart = async ({cartItems}) => {
    try {
        let res = await axios.delete('/api/cart', {items:cartItems}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const makeOrder = async () => {
    try {
        let res = await axios.post('api/cart-to-order', {}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const addItemToOrder = async ({orderItems, orderQuantity}) => {
    try {
        let res = await axios.put('/api/order', {items:orderItems, quantity:orderQuantity},config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getOrder = async () => {
    try {
        let res = await axios.get('/api/order', config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const orderDetails = async ({orderDetail}) => {
    try {
        let res = await axios.post('api/send-email/submit-order', {order_details:orderDetail}, config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getUser = async () => {
    try {
        let res = await axios.get('/api/get-user', config)
        return res.data
    } catch (error) {
        console.log(error)
    }
}