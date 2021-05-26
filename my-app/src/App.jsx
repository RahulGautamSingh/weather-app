import React, { useRef, useState } from "react";

function App() {
  const APIkey = "31af3ad47b414743a46100602211504";
  let inputRef = useRef();
  let [condition, setCondition] = useState(false);
  let [error, setError] = useState(false);
  let [data, setData] = useState({});
  let [icon, setIcon] = useState("");
  async function run() {
    setError(false);
    setCondition(false);
    console.log(inputRef.current.value)
    let city = inputRef.current.value;
    let url =
      "http://api.weatherapi.com/v1/current.json?key=" +
      APIkey +
      "&q=" +
      city +
      "&aqi=yes";
    let response = await fetch(url);
    let rdata = await response.json();
    setData(rdata);
    if (rdata.hasOwnProperty("error")) {
      setError(true);
    } else {
      let airQuality = rdata.current.air_quality.pm10.toFixed(2);
      if (airQuality <= 50) setIcon("😁");
      else if (airQuality <= 100) setIcon("😊");
      else if (airQuality <= 150) setIcon("😐");
      else if (airQuality <= 200) setIcon("😷");
      else if (airQuality <= 300) setIcon("🤢");
      else setIcon("💀");
      setCondition(true);
    }
  }
  return (
    <div className="App">
      <h1>Weather and Pollution Info</h1>

      <label for="location" name="location">
        {" "}
        Location:
        <input
          class="location"
          id="location"
          name="location"
          ref={inputRef}
        />{" "}
      </label>
      <button onClick={() => run()}>Get Info</button>

      {condition && (
        <div class="info">
          <h1 class="cityName">
            {data.location.name + "," + data.location.country}
          </h1>
          <p class="temp">{"Temperature: " + data.current.temp_c + " °C"}</p>
          <p class="aqi">
            {"Air Quality Index: " +
              data.current.air_quality.pm10.toFixed(2) +
              " " +
              icon}
          </p>
        </div>
      )}
      {error && (
        <div class="info">
          <h1>{data.error.message}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
