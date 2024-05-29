import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [email, setEmail] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const signup = useSignup(); 
    const navigate = useNavigate(); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        await signup(email, username, password); 
        navigate("/"); 
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <h3>Signup</h3>
            <label>Email: </label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label>Username: </label>
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
                Signup
            </button>

        </form>
    )
}
