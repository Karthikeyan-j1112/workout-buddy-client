import { useAuthContext } from "./useAuthContext"
import {useWorkoutContext} from './useWorkoutContext'

export const useLogout = () => {

    const { dispatchUser } = useAuthContext()
    const {dispatchWorkout} = useWorkoutContext()
    const logout = () => {
        localStorage.removeItem('user')
        dispatchUser({ type: 'LOGOUT' })
        dispatchWorkout({type : 'RESET'})
    }
    return { logout }
}
