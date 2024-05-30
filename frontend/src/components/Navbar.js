import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
    const { token } = useAuth();
    const logout = useLogout(); 

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>TinyTrace</h2>
                </Link>
                <nav>
                    { token && (
                        <div>
                            <button onClick={()=>{ logout();}}>Logout</button>
                        </div>
                    )}
                    { !token && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}
