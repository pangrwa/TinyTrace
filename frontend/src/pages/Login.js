import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const { login, error, isLoading }= useLogin(); 

    async function handleSubmit(e) {
        e.preventDefault();
        
        await login(username, password); 
    }

    return (
        <form className="login" method="post" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label className="form-label">Username: </label>
            <input
                className="form-control"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label className="form-label">Password: </label>
            <input
                className="form-control"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn btn-primary" disabled={isLoading}>
                Login
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
