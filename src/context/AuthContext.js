
import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return null
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {

    const [user, dispatchUser] = useReducer(authReducer, null)

    const onStorageUpdate =()=>{        
        if (localStorage.getItem('user')) {
            dispatchUser({ type: 'LOGIN', payload: (JSON.parse(localStorage.getItem('user'))) })
        }else{
            dispatchUser({ type: 'LOGOUT' })
        }   
    }
    useEffect(() => {
        if (localStorage.getItem('user')) {
            dispatchUser({ type: 'LOGIN', payload: (JSON.parse(localStorage.getItem('user'))) })
        }
        window.addEventListener("storage", onStorageUpdate);
        return () => {
            window.removeEventListener("storage", onStorageUpdate);
        };
    }, [])
    
    return (
        <AuthContext.Provider value={{ user, dispatchUser }}>
            {children}
        </AuthContext.Provider>
    )

}