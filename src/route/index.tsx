import {
    RouterProvider,
    createHashRouter,
} from "react-router-dom";
import {Layout} from "@/Layout";
import LearnG2 from "@/pages/learnG2.tsx";
import LearnGsap from "@/pages/learnGsap.tsx";
import {ProfileForm} from "@/pages/LoginForm.tsx";
import LearnG6 from "@/pages/LearnG6.tsx";
import HighChartsPage from "@/pages/HighCharts";
import GridBox from "@/pages/grid.tsx";
import LearnL7 from "@/pages/learnL7.tsx";
import LearnDrawer from "@/pages/learnDrawer";
import Login from "@/pages/login.tsx";
import AuthRoute from "@/route/authRoute.tsx";

export const router = createHashRouter([
    {
        path: "",
        element: <AuthRoute children={<Layout/>}/>,
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
                path: 'learnG6',
                element: <LearnG6/>
            },
            {
                path: 'learnHighCharts',
                element: <HighChartsPage/>
            },
            {
                path: 'gridBox',
                element: <GridBox/>
            },
            {
                path: 'learnL7',
                element: <LearnL7/>
            }, {
                path: 'drawerContainer',
                element: <LearnDrawer/>
            }

        ]
    },
    {
        path: "login",
        element: <Login/>
    },
], {
    // 配置基础路由前缀
    basename: ''
});

export default function AppRouter() {
    return <RouterProvider router={router}/>
}