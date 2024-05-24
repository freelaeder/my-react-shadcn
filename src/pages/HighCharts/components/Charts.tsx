import HighchartsReact from 'highcharts-react-official'

// @ts-ignore
const Chart = ({ options, highcharts }) => <HighchartsReact
    highcharts={highcharts}
    constructorType={'chart'}
    options={options}
/>
export default Chart