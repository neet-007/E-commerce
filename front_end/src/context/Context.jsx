import { useState, useEffect, useContext, createContext } from "react";
import { getUser } from "../lib/axios/axios";


const INITIAL_USER = {
    id:'',
    username:'',
    cash:'',
    is_verified:'',
    is_staff:'',
    order:[],
    cart:[]
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: true,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false
}


const userContext = createContext(INITIAL_STATE)


export const UserProvider = ({children}) => {
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async () => {
        try {
            const currnetUser = await getUser()
            if (!currnetUser.error && currnetUser.length !== 0){
                setUser({
                    id:currnetUser[0].id,
                    username:currnetUser[0].username,
                    is_staff:currnetUser[0].is_staff,
                    is_verified:currnetUser[0].is_verified,
                    cash:currnetUser[0].cash,
                    cart:currnetUser[0].cart,
                    order:currnetUser[0].order
                })

                setIsAuthenticated(true)
                return true
            }
        return false
        } catch (error) {
            console.log(error)
            return false
        } finally{
            setIsLoading(false)
        }
    }

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser
    }

    useEffect(() => {
        checkAuthUser()
    },[])
    return(
        <userContext.Provider value={value}>
            {children}
        </userContext.Provider>
    )
}

export const useUserContext = () => useContext(userContext)