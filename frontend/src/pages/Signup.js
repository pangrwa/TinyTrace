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
            <label className="form-label">Email: </label>
            <input 
                className="form-control "
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

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
            <div className="form-text">
                Your password must be at least 8 characters long, contain at least 1 digit, 1 lowercase letter, 1 uppercase letter and must not contain any spaces. 
            </div>

            <button className="btn btn-primary" disabled={isLoading}>
                Signup
            </button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}
