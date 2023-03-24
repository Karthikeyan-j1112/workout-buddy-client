
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-toastify'
import { useWorkoutContext } from "../hooks/useWorkoutContext"
import { useAuthContext } from '../hooks/useAuthContext'

export const WorkoutForm = () => {
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    const { dispatchWorkout } = useWorkoutContext()
    const { user } = useAuthContext()

    const submitHandler = (e) => {
        e.preventDefault()

        if (!user) {
            
            return
        }

        let localEmptyField = []
        if (!title || title === '') {
            localEmptyField.push("title")
        }
        if (reps === null || reps === '') {
            localEmptyField.push("reps")
        }
        if (load === null || load === '') {
            localEmptyField.push('load')
        }
        if (localEmptyField.length > 0) {
            setEmptyFields(localEmptyField)
            return
        }

        const toastWorkout = toast.loading("Adding the new workout", {
            position: toast.POSITION.BOTTOM_RIGHT
        })

        const workout = { title, reps, load }

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/api/workouts`,
            data: workout,
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }).then(response => {
            setTitle('')
            setLoad('')
            setReps('')
            setEmptyFields([])
            toast.update(toastWorkout, {
                render: "New Workout added successfully",
                type: 'success',
                isLoading: false,
                autoClose: true,
                pauseOnFocusLoss: false,
                closeOnClick : true,
                closeButton:true
            })
            dispatchWorkout({ type: "CREATE_WORKOUT", payload: response.data })

        }).catch(err => {
            console.log(err);
            setEmptyFields([])
            toast.update(toastWorkout, {
                render: "Cannot added a new workout",
                type: 'error',
                isLoading: false,
                autoClose: true,
                pauseOnFocusLoss: false,
                closeOnClick : true,
                closeButton:true
            })
        })
    }
    return (
        <>
            <form className="create" onSubmit={submitHandler}>
                <h3>Add a New Workout</h3>

                <label>Workout Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={emptyFields.includes('title') ? "error" : ""}
                />
                <label>Reps:</label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className={emptyFields.includes('reps') ? "error" : ''}
                />
                <label>Load (in kg):</label>
                <input
                    type="number"
                    value={load}
                    step="any"
                    onChange={(e) => setLoad(e.target.value)}
                    className={emptyFields.includes('load') ? "error" : ""}
                />
                <button type="submit" >Add Workout</button>
                {(emptyFields.length > 0) && <div className='error'>Please fill in all the fields</div>}
                
            </form>
        </>
    )
}
