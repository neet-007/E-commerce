import { useEffect } from "react"
import { useAddItemToCart, useGetCartItems, useRemoveItemFromCart } from "../querysandmutaions/queriesandmutaions"
import { addItemToCart1 } from "../lib/axios/axios";

export const useCart = () => {
    const { mutateAsync: addItemToCart, isPending:isAddPedning, isError:isAddError, error:AddError } = useAddItemToCart();
    const { mutateAsync: removeItemFromCart, isPending:isRemovePending, isError:isRemoveError, error:removeError} = useRemoveItemFromCart()
    const {data} = useGetCartItems()
    let cartCount
    if (data){
        cartCount = data[0].count
    }else{
        cartCount = 0
    }
    const addToCart = ({ cartItems, cartQuantity, option }) => {
        const handleAddToCart = () => {
            switch (option) {
                case 'add':
                    if (cartCount === 0){
                        addItemToCart({ cartItems, cartQuantity }).then(res => {
                            console.log(res);
                            alert('Item added to cart');
                        }).catch(err => {
                            console.error('Error adding item to cart:', err);
                            // Handle error here
                        });
                    }else{
                        addItemToCart1({ cartItems, cartQuantity }).then(res => {
                            console.log(res)
                            alert('item added to cart')
                        }).catch(err => {
                            console.error('Error adding item to cart:', err)
                        })
                    }
                    break;
                case 'remove':
                    removeItemFromCart({ cartItems}).then(res => {
                        console.log(res)
                        alert('item removed from cart')
                    }).catch(err => {
                        console.error('Error removing item from cart:', err)
                    })
                default:
                    break;
            }
        };

        handleAddToCart();
    };

    return addToCart;
};