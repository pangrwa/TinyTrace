import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { useLogout } from "../hooks/useLogout";

export default function Navbar() {
    const { token } = useAuth();
    const logout = useLogout(); 

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-body-tertiary"> 
                <div className="container-fluid">
                    <Link to="/"><div className="navbar-brand">TinyTrace</div></Link>
                        { !token &&(
                            <div>
                                <Link to="/login"><button className="btn btn-outline-primary">Login</button></Link>
                                <Link to="/signup"><button className="btn btn-outline-primary">Signup</button></Link>
                            </div>
                        )}
                        { token && (
                            <button className="btn btn-outline-primary" onClick={() => logout()}>Logout</button>
                        )}
                </div>
            </nav>
        </header>

    );
}
