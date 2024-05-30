import { useLogout } from "../hooks/useLogout";

export default function Home() {
    const logout = useLogout(); 

    function handleSubmit(e) {
        e.preventDefault(); 

        logout(); 
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Home</h3>
            <button>Logout</button> 
        </form>
    );
}
