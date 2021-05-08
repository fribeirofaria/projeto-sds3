import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts'
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/request';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {
    //
    //FORMA ERRADA que é definir uma variavel local
    //let chartData : ChartData = {labels: [], series: []};
    //FORMA ERRADA - provoa loop 
    /* axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then (Response => {
            const data = Response.data as SaleSum[];
            const mylabels = data.map(x => x.sellerName);
            const myseries = data.map(x => x.sum);
            //chartData = {labels: mylabels, series: myseries};
            setchartData({labels: mylabels, series: myseries});
            console.log(chartData);
        }); */

    // FORMA CERTA USANDO O HOOK useState
    const [chartData, setchartData] = useState<ChartData>({ labels: [], series: [] });

    // FORMA CERTA USANDO O HOOK useEffect
    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(Response => {
                const data = Response.data as SaleSum[];
                const mylabels = data.map(x => x.sellerName);
                const myseries = data.map(x => x.sum);
                //chartData = {labels: mylabels, series: myseries};
                setchartData({ labels: mylabels, series: myseries });
            });
    }, []);


    // const mockData = {
    //     series: [477138, 499928, 444867, 220426, 473088],
    //     labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    // }

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;