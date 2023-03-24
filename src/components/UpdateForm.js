import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext'

export const UpdateForm = ({ editable, setEditable, workout, setWorkout, emptyFields, setEmptyFields, setUpdatedAt }) => {

    const { user } = useAuthContext()
    const params = useParams()
    const navigate = useNavigate()

    const saveChange = (e) => {
        e.preventDefault();
        if (!user) {

            return
        }

        let localEmptyField = []
        if (!workout.title || workout.title === '') {
            localEmptyField.push("title")
        }
        if (workout.reps === null || workout.reps === '') {
            localEmptyField.push("reps")
        }
        if (workout.load === null || workout.load === '') {
            localEmptyField.push('load')
        }
        if (localEmptyField.length > 0) {
            toast.error("Please fill in all the fields", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setEmptyFields(localEmptyField)
            return
        }

        const toastWorkout = toast.loading("Updating the workout", {
            position: toast.POSITION.BOTTOM_RIGHT
        })

        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/api/workouts/${params.id}`,
            data: {
                title: workout.title,
                reps: workout.reps,
                load: workout.load
            },
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(response => {
                setEmptyFields([])
                toast.update(toastWorkout, {
                    render: "Workout Updated Successfully",
                    type: 'success',
                    isLoading: false,
                    autoClose: true,
                    pauseOnFocusLoss: false,
                    closeOnClick: true,
                    closeButton: true
                })
                setUpdatedAt(new Date());
                setEditable(false)
            })
            .catch(err => {
                console.log(err);
                setEmptyFields([])
                if (err.response.data.error === 'No such Workout exist') {
                    toast.update(toastWorkout, {
                        render: `No such workout exist, may be already deleted`,
                        type: 'error',
                        isLoading: false,
                        autoClose: true,
                        pauseOnFocusLoss: false,
                        closeOnClick: true,
                        closeButton: true
                    })
                    navigate('/', { replace: true })
                }
                else {
                    toast.update(toastWorkout, {
                        render: "Cannot update the workout",
                        type: 'error',
                        isLoading: false,
                        autoClose: true,
                        pauseOnFocusLoss: false,
                        closeOnClick: true,
                        closeButton: true
                    })
                }
            })
    }

    return (
        <form onSubmit={(editable ? saveChange : () => { })} >
            <input
                type="text"
                value={workout.title}
                onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
                disabled={!editable}
                className={emptyFields.includes('title') ? "error title-input" : "title-input"}
            />
            <table className="table-input" ><tbody>
                <tr>
                    <td><strong>Load (kg):</strong></td>
                    <td><input
                        type="Number"
                        step="any"
                        value={workout.load}
                        onChange={(e) => setWorkout({ ...workout, load: e.target.value })}
                        disabled={!editable}
                        className={emptyFields.includes('load') ? "error" : ""}
                    /></td>
                </tr>
                <tr>
                    <td><strong>Reps:</strong> </td>
                    <td><input
                        type="Number"
                        step="any"
                        value={workout.reps}
                        onChange={(e) => setWorkout({ ...workout, reps: e.target.value })}
                        disabled={!editable}
                        className={emptyFields.includes('reps') ? "error" : ""}
                    /></td>
                </tr>
            </tbody></table>
            {editable && <button type="submit" className="table-input-button" >Save Changes</button>}
        </form>
    )
}
