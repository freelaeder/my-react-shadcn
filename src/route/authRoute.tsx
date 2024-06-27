import {useTypedSelector} from "@/store";
import {selectToken} from "@/store/slices/authSlice";
import React from "react";
import {Navigate, Outlet} from "react-router";

interface Props {
    children?: React.ReactNode;
}

export default function AuthRoute({children}: Props) {
    // 获取本地存储的用户登录凭据
    const token = useTypedSelector(selectToken)
    if (!token) return <Navigate to={'login'}/>
    // 如果 children 存在渲染 children
    if (typeof children !== 'undefined') return children
    //否则渲染路由
    return <Outlet/>
}