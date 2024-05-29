import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const login = useLogin(); 
    const navigate = useNavigate(); 

    async function handleSubmit(e) {
        e.preventDefault();
        
        await login(username, password); 
        navigate("/"); 
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <h3>Login</h3>
            <label>Email: </label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label>Password: </label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button>
                Login
            </button>
        </form>
    )
}
