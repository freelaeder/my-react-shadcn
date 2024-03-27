import React from 'react';
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";


const LearnGsap = () => {

    useGSAP(() => {
        gsap.to('#red-box', {
            x: 1350,
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
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>
            <div id={'red-box'} className={'w-[20px] aspect-square bg-red-500'}>

            </div>

        </>
    );
};

export default LearnGsap;