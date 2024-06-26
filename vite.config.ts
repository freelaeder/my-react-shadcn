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
        hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
        host: '127.0.0.1',
        port: 1237,
        // 服务配置
        open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
        cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
        proxy: {
            // 类型： Record<string, string | ProxyOp 为开发服务器配置自定义代理规则
            '/api': {
                target: 'http://61.172.240.132:25003',
                changeOrigin: true,
                secure: false,
                // eslint-disable-next-line no-shadow
                rewrite: (path) => path.replace('/api', '')
            }
        }
    }
})
