import React, { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import './bootstrap.min.css';

function Weather() {

  const geolocation = useGeolocation();
  const API_KEY = process.env.REACT_APP_API_KEY;
  // const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat='+geolocation.latitude.toFixed(13)+'&lon='+geolocation.longitude+'&appid='+API_KEY;

  // const DataFetch = () => { // functional
  //   const [data, setData] = useState(''); // blank JSON information pre-API call
  //   useEffect(() => {
  //     fetch(API_URL, {"method": "GET"})
  //     .then(fetchedData => fetchedData.json())
  //     .then(response => {
  //       setData(response)
  //     });
  //   }, []);
  //   console.log(data);
  //   // return data;
  // }



  return (
    <>
      <p class="lead">test</p>
      {/* {DataFetch()} */}
    </>
  );
}

export default Weather;
