import {useQuery, useMutation} from '@tanstack/react-query'
import {register, login, getAllItems, addItem, addCategory, addItemToCategory, deleteItemFromCategory, editItem, deleteItem, getItemsFromCategory, getSingleItem, addItemToCart} from '../lib/axios/axios'

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

export const useGetItemsFromCategory = (categoryId) => {
    return useQuery({
        queryKey: ['get-items-from-category', categoryId],
        queryFn: () => getItemsFromCategory(categoryId)
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

export const useAddItemToCart = () => {
    return useMutation({
        mutationFn: ({cartItems, cartQuantity}) => addItemToCart({cartItems, cartQuantity})
    })
}