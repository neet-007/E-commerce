import { useEffect, useState } from "react";
import { useAddCategory, useAddItem, useAddItemToCategory, useDeleteItem, useDeleteItemFromCategory, useEditItem, useLogin } from "../querysandmutaions/queriesandmutaions";

export function useAdminOptions (option, input) {
    const {mutateAsync:addItem, isError:isItemError} = useAddItem()
    const {mutateAsync:addCategory, isError:isCategoryError} = useAddCategory()
    const {mutateAsync:addItemToCategory , isError:isItemAddCategoryError} = useAddItemToCategory()
    const {mutateAsync:deleteItemFromCategory , isError:isItemDeleteCategoryError} = useDeleteItemFromCategory()
    const {mutateAsync:editItem , isError:isEditItemError} = useEditItem()
    const {mutateAsync:deleteItem , isError:isDeleteItemError} = useDeleteItem()
    const [result, setResult] = useState(null)
    useEffect(() => {
        let ismounted = true

        if (ismounted){
            switch (option) {
                case 'add-item':
                    addItem({name:"sdad",description:"dsad",price:12.00, category:'d'}).then(res => {setResult(res)})
                    break;
                case 'add-category':
                    addCategory({name:'dsd'}).then(res => {setResult(res)})
                    break;
                case 'add-item-to-category':
                    addItemToCategory({categoryId:1, items:["10", "11"]}).then(res => {setResult(res)})
                    break;
                case 'delete-item-from-category':
                    deleteItemFromCategory({categoryId:1, items:["10", "11"]}).then(res => {setResult(res)})
                case 'edit-item':
                    editItem({itemId:4, name:'changed'}).then(res => {setResult(res)})
                    break;
                case 'delete-item':
                    deleteItem({itemId:4}).then(res => {setResult(res)})
                    break;
                 default:
                    break;
            }
        }

        () => {ismounted = false}
    },[option])
    return result
}