import { useEffect } from "react"
import { useMakeOrder, useAddItemToOrder } from "../querysandmutaions/queriesandmutaions"
import { useUserContext } from "../context/Context";

export const useOrder = (option) => {
    const { mutateAsync: makeOrder, isPending:isAddPedning, isError:isAddError, error:AddError } = useMakeOrder();
    const { mutateAsync: addItemToOrder, isPending:isAdd1Pending, isError:isAdd1Error, error:add1Error} = useAddItemToOrder()
    const {user, isLoading} = useUserContext()
    if(isLoading){

    }
    const userOrderOptions = () => {
        const handleUserOrderOption = () => {
            switch (option) {
                case 'add':
                    if (user.order.length === 0){
                        makeOrder().then(res => {
                            console.log(res);
                            alert('Item added to order');
                        }).catch(err => {
                            console.error('Error adding item to order:', err);
                            // Handle error here
                        });
                    }else{
                        addItemToOrder({ orderItems:user.cart[0].cart_items, orderQuantity }).then(res => {
                            console.log(res)
                            alert('item added to order')
                        }).catch(err => {
                            console.error('Error adding item to order:', err)
                        })
                    }
                    break;
                case 'remove':
                    removeItemFromCart({ orderItems}).then(res => {
                        console.log(res)
                        alert('item removed from order')
                    }).catch(err => {
                        console.error('Error removing item from order:', err)
                    })
                default:
                    break;
            }
        };

        handleUserOrderOption();
    };
    let isPending;
    let isError;
    let error;
    if (option === 'add' && user.order.length === 0){
        isPending = isAddPedning
        isError = isAddError
        error = AddError
    }else if(option === 'add'){
        isPending = isAdd1Pending
        isError = isAdd1Error
        error = add1Error
    }else if(option === 'remove')[

    ]
    return {userOrderOptions, isPending, isError, error};
};