import {
    RouterProvider,
    createBrowserRouter
} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRouter from "./PrivateRouter";

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
                    element: <div>Home page</div>
                },
            ],
        }
    ]

    const router = createBrowserRouter([
        ...publicRoutes,
        ...authenticatedRoutes,
    ]);
    
    return <RouterProvider router={router} />; 
};
