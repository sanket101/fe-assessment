import React, { useState, useEffect } from 'react';
import MonitorBar from '../MonitorBar/MonitorBar';
import LineGraph from '../LineGraph/LineGraph';
import connectToWS from '../../common-util/websocket';
import VehicleMap from '../VehicleMap/VehicleMap';

// WebSocket URL pointing to the server where data is broadcasted.

// Parameterized VehicleData component to have any websocket URL
const VehicleData = ({ WS_URL = 'ws://localhost:3000' }) => {
    const [vehicleData, setVehicleData] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const throttleFn = (cb, delay) => {
        let timer = null;

        return function (...args) {
            if (!timer) {
                cb(args);
                timer = setTimeout(() => {
                    clearTimeout(timer);
                    timer = null;
                }, delay);
            }
        };
    };


    // Limiting the rate of updates in component, so that user can perceive data per sec
    const throttledSetData = throttleFn((args) => {
        setVehicleData(args[0]);
    }, 1000);

    useEffect(() => {
        // Open a WebSocket connection.
        const ws = connectToWS(WS_URL, setIsConnected, throttledSetData);
        // Clean up on component unmount.
        return () => {
            ws.close();
        };
    }, []);
    // [] ensures this effect runs only once when the component mounts.

    return (<>
        {isConnected ? <section>
            <div className="numeric-data-container">
                <div className="geo-location">
                    <VehicleMap gps={vehicleData?.gps} />
                </div>
                <div className="vehicle-attributes">
                    <MonitorBar heading='Current Speed' width={vehicleData?.speed} text={`${vehicleData?.speed || 0}km/h`} />

                    <MonitorBar heading='State of Charge' width={vehicleData?.soc} text={`${vehicleData?.soc || 0}%`} />

                    <div className="flex-display">
                        <div className="energy-attribute">
                            <h4>Energy</h4>

                            <p>{vehicleData?.energy || 0} kW</p>
                        </div>

                        <div className="odometer-attribute">
                            <h4>Odometer</h4>

                            <p>{vehicleData?.odo || 0} km</p>
                        </div>
                    </div>
                </div>
            </div>
            <LineGraph labelForGraph="Speed (km/h)" heading="Speed Profile" vehicleData={vehicleData?.speed} numOfEntries={20} />
            <LineGraph labelForGraph="SoC (%)" heading="State of Charge Profile" vehicleData={vehicleData?.soc} numOfEntries={5} />
        </section> : <p>Something went wrong! Please try again after sometime...</p>}</>
    );
};

export default VehicleData;
