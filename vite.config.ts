import path from "path"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"
import { codeInspectorPlugin } from 'code-inspector-plugin';

export default defineConfig({
    plugins: [
        react(),
        codeInspectorPlugin({
            bundler: 'vite',
        }),
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './'),
            // 定义src目录的别名
            "@": path.resolve(__dirname, "src"),
        },
    },
    server: {
        open: true,

    }
})
