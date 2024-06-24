import {
    RouterProvider,
    createHashRouter,
} from "react-router-dom";
import {NavigationMenuDemo} from "@/Layout";
import LearnG2 from "@/pages/learnG2.tsx";
import LearnGsap from "@/pages/learnGsap.tsx";
import {ProfileForm} from "@/pages/LoginForm.tsx";
import LearnG6 from "@/pages/LearnG6.tsx";
import HighChartsPage from "@/pages/HighCharts";
import GridBox from "@/pages/grid.tsx";
import LearnL7 from "@/pages/learnL7.tsx";

export const router = createHashRouter([
    {
        path: "",
        element: <NavigationMenuDemo/>,
        errorElement: <div>404</div>,
        children: [
            {
                path: '',
                element: <LearnG2/>,
            },
            {
                path: 'learnGsap',
                element: <LearnGsap/>
            },
            {
                path: 'loginForm',
                element: <ProfileForm/>
            },
            {
                path:'learnG6',
                element: <LearnG6 />
            },
            {
                path:'learnHighCharts',
                element: <HighChartsPage />
            },
            {
                path:'gridBox',
                element:<GridBox />
            },
            {
                path:'learnL7',
                element:<LearnL7/>
            }

        ]
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router}/>
}