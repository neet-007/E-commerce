import { useEffect } from "react"
import { useAddItemCart1, useAddItemToCart, useGetCartItems, useRemoveItemFromCart } from "../querysandmutaions/queriesandmutaions"
import { useUserContext } from "../context/Context";

export const useCart = (option) => {
    const { mutateAsync: addItemToCart, isPending:isAddPedning, isError:isAddError, error:AddError } = useAddItemToCart();
    const { mutateAsync: removeItemFromCart, isPending:isRemovePending, isError:isRemoveError, error:removeError} = useRemoveItemFromCart()
    const { mutateAsync: addItemToCart1, isPending:isAdd1pending, isError:isAdd1Error, error:add1Error } = useAddItemCart1()
    const {user, isLoading} = useUserContext()
    if(isLoading){

    }
    const cartOptions = ({ cartItems, cartQuantity}) => {
        const handleAddToCart = () => {
            switch (option) {
                case 'add':
                    if (user.cart.length === 0){
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
    let isPending;
    let isError;
    let error
    if (option === 'add' && user.cart.length === 0){
        isPending = isAddPedning
        isError = isAddError
        error = AddError
    }else if(option === 'add'){
        isPending = isAdd1pending
        isError = isAdd1Error
        error = add1Error
    }else if (option === 'remove'){
        isPending = isRemovePending
        isError = isRemoveError
        error = removeError
    }
    return {cartOptions, isPending, isError, error};
};