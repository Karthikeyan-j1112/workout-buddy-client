import { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import { MdDelete, MdEdit, MdEditOff } from 'react-icons/md'
import { UpdateForm } from "../components/UpdateForm"
import { formatDistanceToNow } from "date-fns"
import { useAuthContext } from '../hooks/useAuthContext'

export const SingleWorkout = () => {

    const [workout, setWorkout] = useState(null)
    const [searchParams] = useSearchParams()
    const [editable, setEditable] = useState(searchParams.get('editable') || false)
    const [emptyFields, setEmptyFields] = useState([])
    const [updatedAt, setUpdatedAt] = useState(null)
    const editHandler = () => {
        setEditable(editable ? false : true)
    }

    const params = useParams()
    const { user } = useAuthContext()

    useEffect(() => {
        if (user) {
            const config = {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            }
            axios.get(`/api/workouts/${params.id}`, config)
                .then(response => {
                    setWorkout(response.data);
                    setUpdatedAt(response.data.updatedAt)
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.data.error === 'No such Workout exist') {
                        navigate('/', { replace: true })
                    }
                })
        }
    }, [])

    const navigate = useNavigate()
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
                navigate('/', { replace: true })         
            })
            .catch(err => {
                toast.update(toastWorkout, {
                    render: `${err.response.data.error}, may be already deleted`,
                    type: 'error',
                    isLoading: false,
                    autoClose: true,
                    pauseOnFocusLoss: false,
                    closeOnClick : true,
                    closeButton:true
                })                
                navigate('/', { replace: true })
                console.log(err);
            })
        
    }

    return (
        <div className="workout-single" >
            {workout && (
                <div className='workout-detail-single'>
                    <UpdateForm
                        editable={editable}
                        setEditable={setEditable}
                        workout={workout}
                        setWorkout={setWorkout}
                        emptyFields={emptyFields}
                        setEmptyFields={setEmptyFields}
                        setUpdatedAt={setUpdatedAt}
                    />

                    <table className="date"><tbody>
                        <tr>
                            <td style={{ textAlign: 'right' }}>Created :</td>
                            <td>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'right' }}>Updated :</td>
                            <td>{formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}</td>
                        </tr>
                    </tbody></table>

                    <div>
                        <span onClick={editHandler} > {!editable ? <MdEdit style={{ color: 'blue' }} size='20px' /> : <MdEditOff style={{ color: 'red' }} size='20px' />} </span>
                        <span onClick={deleteHandler} > <MdDelete style={{ color: '#e7195a' }} size='20px' /> </span>
                    </div>
                </div>
            )}
        </div>

    )
}
