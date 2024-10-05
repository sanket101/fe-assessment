import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineGraph = React.memo(({ vehicleData, labelForGraph = "", heading = "", numOfEntries = 10}) => {
    // State to store graph data
    const [data, setData] = useState({
        labels: [],  // Time labels
        datasets: [{
            label: labelForGraph,
            data: [],  // Speed data
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    });

    useEffect(() => {
        if (vehicleData) {
            const currentTime = new Date().toLocaleTimeString();

            // Update speed chart data
            setData((prevData) => ({
                ...prevData,
                labels: [...prevData.labels, currentTime].slice(-1 * +numOfEntries),  // Keep the last 10 points
                datasets: [{
                    ...prevData.datasets[0],
                    data: [...prevData.datasets[0].data, vehicleData].slice(-1 * +numOfEntries)  // Keep the last 10 points
                }]
            }));
        }
    }, [vehicleData]);  // Rerun effect whenever new vehicle data is received

    return (
        <div className="line-graph-container">
            <h2>{heading}</h2>

            <div>
                <Line data={data} />
            </div>
        </div>
    );
});

export default LineGraph;
