import { useState, useEffect, useContext, createContext } from "react";


const INITIAL_USER = {
    id:'',
    email:'',
    username:''
}

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false
}


const userContext = createContext(INITIAL_STATE)


export const userProvider = ({children}) => {
    const [user, setUser] = useState(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const checkAuthUser = async () => {
        try {
            const currnetUser = await getCurrentUser()
            if (!currnetUser.error){
                setUser({
                    id:currnetUser.id,
                    email:currnetUser.email,
                    username:currnetUser.username
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

export const useUserContetx = () => useContext(userContext)