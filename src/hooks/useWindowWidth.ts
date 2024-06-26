import { useState, useEffect } from 'react';

function useWindowWidth(): number {
    // 定义一个状态来存储当前窗口的宽度
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        // 定义一个处理函数来更新宽度
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // 监听窗口的resize事件
        window.addEventListener('resize', handleResize);

        // 在组件卸载时，移除事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width - 35;
}

export default useWindowWidth;
