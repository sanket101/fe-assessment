const connectToWS = (url, setIsConnected, setData) => {
    const ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            setIsConnected(true);
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setData(data);  // Set the received data to the state.
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            setIsConnected(false);
            //Try to reconnect if disconnected
            setTimeout(() => connectToWS(url, setIsConnected, setData), 3000); 
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        };

        return ws;
}

export default connectToWS;