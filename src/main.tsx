import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/app/globals.css'
import AppRouter from "@/route";
import '@/app/preflight.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AppRouter/>
    </React.StrictMode>
    ,
)
