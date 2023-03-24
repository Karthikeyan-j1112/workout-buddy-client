import { createContext, useReducer } from "react";

export const WorkoutContext = createContext()

export const WorkoutContextProvider = (props) => {

    const workoutReducer = (state,action)=>{
        switch (action.type) {
            case 'SET_WORKOUTS':
                return action.payload                
            case 'CREATE_WORKOUT' :
                return [action.payload,...state]
            case 'DELETE_WORKOUT':
                return state.filter(workout => workout._id !== action.payload._id)
            case 'RESET' :
                return null
            default:
                return state 
        }
    }

    const [workouts, dispatchWorkout] = useReducer(workoutReducer, null)
    
    return (
        <WorkoutContext.Provider value={{workouts,dispatchWorkout}}>
            {props.children}
        </WorkoutContext.Provider>
    )

}