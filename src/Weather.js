import React, { Component } from 'react';
import Clock from './Clock';
import './bootstrap.min.css';

  // add icons eventually with this: https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geoData: null,
      manualData: null,
      zip: 0,
      country: ''
    };
  }

  componentDidMount() {
    this.fetchCoordinates()
      .then((position) => {
        this.fetchGeoData(position.coords.latitude, position.coords.longitude)
      })
      .catch((error) => console.log(error));
  }

  fetchCoordinates = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  fetchManualData = async () => {
    const MANUAL_API_URL = 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip + ',' + this.state.country + '&appid=' + process.env.REACT_APP_API_KEY;
    const call = await fetch(MANUAL_API_URL);
    const data = await call.json();
    this.setState({
      manualData: data
    });
  }

  fetchGeoData = async (lat, long) => {
    const GEO_API_URL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=' + process.env.REACT_APP_API_KEY;
    const call = await fetch(GEO_API_URL);
    const data = await call.json();
    this.setState({
      geoData: data
    });
  }

  // Dashboard = () => { this works, use this template for building functional components
  //   const geoData = this.state.geoData;
  //   if (geoData) {
  //     return (
  //       <p>{geoData.base}</p>
  //     );
  //   }
  // }

  render() {
    return (
      <>
        <Clock />
        {/* {this.Dashboard()} */}
      </>
    );
  }
}
