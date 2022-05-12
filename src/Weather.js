import React, { useState, useEffect } from 'react';
import useGeolocation from 'react-hook-geolocation';
import Clock from './Clock';
import './bootstrap.min.css';

function Weather() {

  // add icons eventually with this: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
  const API_KEY = process.env.REACT_APP_API_KEY;

  function GeolocationDataFetch(lat, long) {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+API_KEY;
    const [geoData, setGeoData] = useState();
    useEffect(() => {
      fetch(API_URL, {"method": "GET"})
      .then(fetchedData => fetchedData.json())
      .then(response => {
        setGeoData(response)
      });
    }, []);
    console.log(geoData);
    return geoData;
  } // gotta use some sort of callback with geolocation api

  function ManualDataFetch(zip, country) {
    const MANUAL_API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',' + country + '&appid=' + API_KEY;
    const [manualData, setManualData] = useState();
    useEffect(() => {
      fetch(MANUAL_API_URL, { "method": "GET" })
        .then(fetchedData => fetchedData.json())
        .then(response => {
          setManualData(response)
        });
    }, []);
    console.log(manualData);
    // return manualData;
  }

  function convertUnix(utime) {
    return new Date(utime * 1000).toLocaleString();
  }

  return (
    <>
      <div>
        <Clock />
      </div>
    </>
  );
}

export default Weather;
