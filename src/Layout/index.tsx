import {Outlet} from "react-router";
import MenuContainer from "@/Layout/Menu.tsx";
export function NavigationMenuDemo() {

    return (
        <>
            <MenuContainer/>
            <Outlet/>
        </>
    )
}

