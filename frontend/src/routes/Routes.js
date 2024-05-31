import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Error from "../pages/Error"; 
import PrivateRouter from "./PrivateRouter";
import NavbarWrapper from "./NavbarWrapper";

export default function Routes() {
    const publicRoutes = [
        {
            path: "/login",
            element: <Login/>
        },
        {
            path: "/signup",
            element: <Signup/>
        }
    ]

    const authenticatedRoutes =[
        {
            path: "/",
            element: <PrivateRouter/>,
            children: [
                {
                    path: "/",
                    element: <Home />
                },
            ],
        }
    ]

    const router = createBrowserRouter([{
        path: "/", 
        element: <NavbarWrapper />,
        errorElement: <Error/>,
        children: [
        ...publicRoutes,
        ...authenticatedRoutes,
        ],
    }]);
    
    return <RouterProvider router={router} />
};
