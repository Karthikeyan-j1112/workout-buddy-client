import { Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from "../hooks/useLogout"


export const Navbar = () => {

    const { user } = useAuthContext()
    const { logout } = useLogout()

    const handleLogout = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to={'/'}>
                    <h1>Workout Buddy</h1>
                </Link>
                <nav>
                    {(!user) ? (
                        <div>
                            <Link to='/login' > Login </Link>
                            <Link to='/signup' > Signup </Link>
                        </div>
                    ) : (
                        <div>
                            <span>{user.email} </span>
                            <button onClick={handleLogout}>Log out</button>
                        </div>
                    )}

                </nav>
            </div>
        </header>
    )
}
