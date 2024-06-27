import {configureStore} from '@reduxjs/toolkit'
import {counterSlice} from "@/store/slices/counterSlice"
import {authReducer, authSlice} from "@/store/slices/authSlice.ts";
import {persistStore} from "redux-persist";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const store = configureStore({
    reducer: {
        [counterSlice.name]: counterSlice.reducer,
        [authSlice.name]: authReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
            },
        }),

})
// 获取store中管理的状态的类型
export type AppState = ReturnType<typeof store.getState>
// 获取dispatch方法的类型
export type AppDispatch = typeof store.dispatch
// 用于获取带有类型的dispatch方法
export const useTypedDispatch = () => useDispatch<AppDispatch>()
// 获取带有类型的useSelector方法
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector
// 持久化对象
export const persistor = persistStore(store)
export default store