import {useQuery, useMutation} from '@tanstack/react-query'
import {register, login, getAllItems, addItem, addCategory, addItemToCategory, deleteItemFromCategory, editItem, deleteItem, getItemsFromCategory, getSingleItem, addItemToCart, getCartItems, getOrder, makeOrder, removeItemFromCart, addItemToCart1, orderDetails, getUser, addItemToOrder, getHomeItems, serachAllItems, searchSomeItems, getItemsFromGender} from '../lib/axios/axios'

export const useRegister = () => {
    return useMutation({
        mutationFn: ({email, username, password, re_password}) => register({email, username, password, re_password}),
    })
}

export const useLogin = () => {
    return useMutation({
        mutationFn: ({email, password}) => login({email, password})
    })
}

export const useGetAllItems = () => {
    return useQuery({
        queryKey: ['all-items'],
        queryFn: getAllItems
    })
}

export const useSearchAllItems = (searchValue) => {
    return useQuery({
        queryKey: ['search-all-items', searchValue],
        queryFn: () => serachAllItems(searchValue),
        keepPreviousData: true,
        staleTime: 1000
    })
}

export const useSearchSomeItems = (searchValue) => {
    return useQuery({
        queryKey: ['search-some-items', searchValue],
        queryFn: () => searchSomeItems(searchValue),
        keepPreviousData: true,
        staleTime: 1000
    })
}

export const useGetHomeItems = () => {
    return useQuery({
        queryKey: ['home-items'],
        queryFn: getHomeItems
    })
}

export const useGetSingleItem = (itemId) => {
    return useQuery({
        queryKey: ['single-item', itemId],
        queryFn: () => getSingleItem(itemId)
    })
}

export const useAddItem = () => {
    return useMutation({
        mutationFn: ({name, description, price, category}) => addItem({name, description, price, category})
    })
}

export const useAddCategory = () => {
    return useMutation({
        mutationFn: ({name}) => addCategory({name})
    })
}

export const useGetItemsFromGender = ({genderId, category, subCategory}) => {
    return useQuery({
        queryKey: ['get-items-from-gender', genderId, category, subCategory],
        queryFn: () => getItemsFromGender({genderId, category, subCategory})
    })
}

export const useGetItemsFromCategory = ({categoryId, filter}) => {
    return useQuery({
        queryKey: ['get-items-from-category', categoryId, filter],
        queryFn: () => getItemsFromCategory({categoryId, filter})
    })
}
export const useAddItemToCategory = () => {
    return useMutation({
        mutationFn: ({categoryId, items}) => addItemToCategory({categoryId, items})
    })
}

export const useDeleteItemFromCategory = () => {
    return useMutation({
        mutationFn: ({categoryId, items}) => deleteItemFromCategory({categoryId, items})
    })
}

export const useEditItem = () => {
    return useMutation({
        mutationFn: ({itemId, name, description, price}) => editItem({itemId, name, description, price})
    })
}

export const useDeleteItem = () => {
    return useMutation({
        mutationFn: ({itemId}) => deleteItem({itemId})
    })
}

export const useGetCartItems = () => {
    return useQuery({
        queryKey:['get-cart-items'],
        queryFn: getCartItems
    })
}

export const useAddItemToCart = () => {
    return useMutation({
        mutationFn: ({cartItems, cartQuantity}) => addItemToCart({cartItems, cartQuantity})
    })
}

export const useAddItemCart1 = () => {
    return useMutation({
        mutationFn: ({cartItems, cartQuantity}) => addItemToCart1({cartItems, cartQuantity})
    })
}

export const useRemoveItemFromCart = () => {
    return useMutation({
        mutationFn: ({cartItems}) => removeItemFromCart({cartItems})
    })
}

export const useMakeOrder = () => {
    return useMutation({
        mutationFn: makeOrder
    })
}

export const useGetOrder = () => {
    return useQuery({
        queryKey: ['get-order'],
        queryFn: getOrder
    })
}

export const useAddItemToOrder = () => {
    return useMutation({
        mutationFn: ({orderItems, orderQuantity}) => addItemToOrder({orderItems, orderQuantity})
    })
}

export const useOrderDetails = () => {
    return useMutation({
        mutationFn: ({orderDetail}) => orderDetails({orderDetail})
    })
}

export const useGetUser = () => {
    return useQuery({
        queryKey: ['get-user'],
        queryFn: getUser
    })
}