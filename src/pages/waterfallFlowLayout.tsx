import {useEffect, useState} from "react";

const WaterfallFlowLayout = () => {
    // 图片路径数组
    const [images, setImages] = useState([])
    useEffect(() => {
        // 加载图片路径
        const loadImages = async () => {
            // 使用 glob 加载项目中的图片
            const imageModules = import.meta.glob('@/assets/wallseven/*.png');
            const loadedImages = await Promise.all(
                Object.values(imageModules).map(async (module) => {
                    const moduleResult = await module();
                    // @ts-ignore
                    return moduleResult.default; // 图片路径在模块的 default 导出中
                })
            );
            // @ts-ignore
            setImages(loadedImages);
        }
        loadImages()
    }, []);
    return (
        <div style={{columns: '300px 6'}}>
            {
                images.map((item, index) => {
                    return <div key={index} className={'bg-gray-600  w-full h-full'}><img className={'w-full h-full mb-0.5'}
                                                                                         src={item} alt=""/></div>
                })
            }

        </div>
    );
};

export default WaterfallFlowLayout;