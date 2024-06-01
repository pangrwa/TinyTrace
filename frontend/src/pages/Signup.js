import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {

    const [email, setEmail] = useState(""); 
    const [username, setUsername] = useState(""); 
    const [password, setPassword] = useState(""); 
    const { signup, error, isLoading }= useSignup(); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        await signup(email, username, password); 
    }

    return (
        <form className="signup" method="post" onSubmit={handleSubmit}>
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

            <button disabled={isLoading}>
                Signup
            </button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}
