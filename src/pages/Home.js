import { useEffect } from "react"
import axios from 'axios'
import { WorkoutsDetails } from "../components/WorkoutsDetails"
import { WorkoutForm } from "../components/WorkoutForm"
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

export const Home = () => {

  const { workouts, dispatchWorkout } = useWorkoutContext()

  const { user } = useAuthContext()

  useEffect(() => {
    if (user) {
      const config = {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      }
      axios.get(`${process.env.REACT_APP_API_URL}/api/workouts`,config)
        .then(response => {
          dispatchWorkout({
            type: "SET_WORKOUTS",
            payload: response.data
          })
        })
        .catch(err => {
          console.log(err);
        })
    }
  }, [user])

  return (
    <div className="home" >
      <div className="workouts">
        {
          workouts && workouts.map(workout =>
            <WorkoutsDetails key={workout._id} workout={workout} />
          )
        }
      </div>
      <WorkoutForm />
    </div>

  )
}
