import { useEffect } from "react"
import { useAddItemToCart } from "../querysandmutaions/queriesandmutaions"

export const useCart = () => {
    const { mutateAsync: addItemToCart, isPending, isError, error } = useAddItemToCart();

    const addToCart = ({ cartItems, cartQuantity }) => {
        const handleAddToCart = () => {
            console.log('dsada')
            addItemToCart({ cartItems, cartQuantity }).then(res => {
                console.log(res);
                alert('Item added to cart');
            }).catch(err => {
                console.error('Error adding item to cart:', err);
                // Handle error here
            });
        };

        handleAddToCart();
    };

    return addToCart;
};