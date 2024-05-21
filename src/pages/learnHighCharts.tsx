import React from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

const options = {
    title: {
        text: 'My stock chart'
    },
    series: [{
        data: [1, 2, 3]
    }]
}

const MyStockChart = () => <HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
/>

// https://stackblitz.com/edit/react-4ded5d?file=data%2FmapData.js
export default MyStockChart