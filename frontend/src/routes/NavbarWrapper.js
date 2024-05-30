import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NavbarWrapper() {

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
