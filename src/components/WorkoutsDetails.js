import axios from 'axios'
import React from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'

import { MdDelete, MdEdit } from 'react-icons/md'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'

export const WorkoutsDetails = ({ workout }) => {

    const { dispatchWorkout } = useWorkoutContext()
    const { user } = useAuthContext()

    const deleteHandler = () => {
        if (!user) {
            return
        }
        const toastWorkout = toast.loading("Deleting the workout", {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        const config = {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        }        
        axios.delete(`/api/workouts/${workout._id}`, config)
            .then(response => {
                dispatchWorkout({ type: "DELETE_WORKOUT", payload: response.data })
                const toastMsg = () => (
                    <div style={{ color: '#e7195a' }} >
                        Workout Deleted Successfully
                    </div>
                )
                toast.update(toastWorkout, {
                    render: toastMsg,      
                    icon: <MdDelete style={{ color: '#e7195a' }} />,
                    progressStyle: {
                        background: '#e7195a'
                    },              
                    isLoading: false,
                    autoClose: true,
                    pauseOnFocusLoss: false,
                    closeOnClick : true,
                    closeButton:true
                })                
            })
            .catch(err => {
                toast.update(toastWorkout, {
                    render: err.response.data.error,
                    type: 'error',
                    isLoading: false,
                    autoClose: true,
                    pauseOnFocusLoss: false,
                    closeOnClick : true,
                    closeButton:true
                })                
                console.log(err);
            })
    }

    const navLink = `/workout/${workout._id}`
    const navigate = useNavigate()
    const editLinkHandler = () => {
        navigate({
            pathname: `/workout/${workout._id}`,
            search: `?${createSearchParams({ editable: true })}`
        })
    }

    return (
        <div className='workout-details'>
            <Link to={navLink}  >  <h4>{workout.title}  </h4> </Link>
            <p><strong>Load (kg): </strong> {workout.load}</p>
            <p><strong>Reps: </strong> {workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <div>
                <span onClick={editLinkHandler}> <MdEdit style={{ color: 'blue' }} size='20px' />  </span>
                <span onClick={deleteHandler} > <MdDelete style={{ color: '#e7195a' }} size='20px' /> </span>
            </div>
        </div>
    )
}
