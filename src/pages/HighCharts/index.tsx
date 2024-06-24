// Import Highcharts
import Highcharts from 'highcharts/highstock'
import Charts from "@/pages/HighCharts/components/Charts.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";


/**
 * 生成指定数量的随机整数
 * @param count
 * @param min
 * @param max
 */
const generateRandomNumbers = (count: number, min: number, max: number): number[] => {
    return Array.from({length: count}, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const HighChartsPage = () => {

    const chartOptionsDefault = {
        title: {
            text: ''
        },
        series: [{
            data: [1, 2, 3],
        }]
    }


    const [chartOptions, setChartOptions] = useState(chartOptionsDefault)



    return (
        <div className={'mt-10'}>
            <h2 className={'border-b-2 font-yz border-gray-100 border-dashed'}>HighCharts</h2>

            <div className={'w-full flex items-center gap-2 my-5 justify-evenly'}>
                <Button className={'w-[220px]'} disabled={chartOptions.series.length >= 10}
                        onClick={() => setChartOptions({
                            ...chartOptions,
                            series: [
                                ...chartOptions.series,
                                {
                                    data: generateRandomNumbers(3, 1, 10000),
                                }
                            ]
                        })}> new Data </Button>
                <Button
                    className="w-[220px]"
                    disabled={chartOptions.series.length === 0}
                    onClick={() => setChartOptions({
                        ...chartOptions,
                        series: chartOptions.series.slice(0, -1)
                    })}
                >
                    remove Data
                </Button>
            </div>
            <Charts
                options={chartOptions}
                highcharts={Highcharts}
            />
            <h2 className={'no-underline hover:underline hover:text-blue'}>HighStock</h2>


        </div>
    );
};

export default HighChartsPage;