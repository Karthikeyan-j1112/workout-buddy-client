# Workout Buddy Client

This is the frontend part of the full stack project called Workout buddy. This web app is built on React.js

This serves the user to create account and maintain their Workout details.
The user can add new workouts, delete and update existing workouts.

This webapp uses [https://workoutbuddy-whov.onrender.com](https://workoutbuddy-whov.onrender.com) as the backend api to create users and workouts and maintain them.

The workouts are specific for the users and they are accessible only if the user is logged in. The user login will be verified with the help of JWT(JSON web token) that will be provided by the server(api) at the time of login or signup.

The routing of this web app is handled with the help of [react-router-dom](https://reactrouter.com/en/main) package. And the request to backend api and receiving response from it is handled with the help of [axios](https://axios-http.com/) package.

To enhance the user experience, this webapp also using some extra npm packages like:
* [react toastify](https://fkhadra.github.io/react-toastify/introduction)
* [react icons](https://react-icons.github.io/react-icons)

This web app is hosted online with the help of [Netilfy.com](https://www.netlify.com/).

### Link for this webapp: 
[https://workout-buddy-karthikeyan.netlify.app](https://workout-buddy-karthikeyan.netlify.app/)

The backend api is created with help of Express.js and Node.js which is hosted online on [render.com](https://render.com/).
Link for the api: [https://workoutbuddy-whov.onrender.com](https://workoutbuddy-whov.onrender.com)

Source code of the backend api - [https://github.com/Karthikeyan-j1112/workout-buddy](https://github.com/Karthikeyan-j1112/workout-buddy)
