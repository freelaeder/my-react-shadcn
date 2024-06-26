import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import useWindowWidth from "@/hooks/useWindowWidth.ts";


// 定义颜色数组和随机颜色选择函数
const colors: string[] = [
    'bg-red-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
];

const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};
const LearnGsap = () => {
    const width = useWindowWidth()
    const boxes = Array.from({ length: 30 });

    console.log(width,'width')
    useGSAP(() => {
        gsap.to('#red-box', {
            x: width,
            repeat: -1,
            yoyo: true,
            rotation: 360,
            duration: 2,
            ease: "bounce.sine",
            stagger: 0.5
        })
        gsap.to('.feature-text-left',{
            opacity:1,
            duration:1,
            x:0,

        })
        gsap.to('.feature-text-right',{
            opacity:1,
            duration:1,
            x:0,

        })
    }, [])
    return (
        <>

            <div className={'flex justify-between'}>
                <h1 className='feature-text-left'>freelaeder</h1>
                <nav>
                    <ul className={'flex gap-x-8 feature-text-right'}>
                        <li>home</li>
                        <li>about me</li>
                        <li>case</li>
                        <li>link</li>
                    </ul>
                </nav>

            </div>
            {boxes.map((_, index) => (
                <div
                    key={index}
                    id="red-box"
                    className={`w-[20px] aspect-square ${getRandomColor()}`}
                />
            ))}


        </>
    );
};

export default LearnGsap;