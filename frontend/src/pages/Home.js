import { useLogout } from "../hooks/useLogout";

export default function Home() {
    const logout = useLogout(); 

    function handleSubmit(e) {
        e.preventDefault(); 

        logout(); 
    }

    return (
        <h1>Home</h1>
    );
}
