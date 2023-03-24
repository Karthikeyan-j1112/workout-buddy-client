
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useLogin = () => {

    const { dispatchUser } = useAuthContext()

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)

    const login = (email, password) => {
        setIsLoading(true)
        setError(null)
        axios({
            method: 'post',
            url: '/api/user/login',
            headers: { 'Content-Type': 'application/json' },
            data: { email, password }
        })
            .then(response => {                
                localStorage.setItem('user', JSON.stringify(response.data))                
                dispatchUser({ type: 'LOGIN', payload: response.data })
                setIsLoading(false)

            }).catch(err => {
                setIsLoading(false)                
                setError(err.response.data.error)
            })
    }

    return { login, error, isLoading }
}
