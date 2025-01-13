import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    // Function to start polling
    const startPolling = () => {
      axios.get('http://localhost:5000/poll')
        .then(response => {
          if (isMounted) {
            setData(response.data);
            console.log("Data received:", response.data);
            startPolling();  // Continue polling after receiving data
          }
        })
        .catch(error => {
          console.error('Error while polling:', error);
          if (isMounted) {
            setTimeout(startPolling, 2000);  // Retry after a delay on error
          }
        });
    };

    // Start the long polling when the component mounts
    startPolling();

    // Cleanup on component unmount
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <h1>Long Polling with Express and React</h1>
      <div>
        {data ? <p>{data.message}</p> : <p>Waiting for new data...</p>}
      </div>
    </div>
  );
}

export default App;