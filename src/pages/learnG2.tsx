import { Area } from '@ant-design/plots';
import {useEffect} from "react";
import {queryCarbonIntensityTrend} from "@/api/auth";
const LearnG2 = () => {
    // @ts-ignore
    const config = {
        data: {
            type: 'fetch',
            value: 'https://assets.antv.antgroup.com/g2/unemployment-by-industry.json',
        },
        xField: (d:any) => new Date(d.date),
        yField: 'unemployed',
        colorField: 'industry',
        shapeField: 'smooth',
        stack: true, // Try to remove this line.
    };

    useEffect(() => {
        queryCarbonIntensityTrend()
    }, []);
    return <Area {...config} />;
};

export default LearnG2;