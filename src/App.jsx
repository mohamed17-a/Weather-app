import { useEffect, useState } from "react";
import "./App.css";
import { getWeather } from "./services/weather.service";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const cities = [
    "Cairo",
    "London",
    "Qatar",
    "Riyadh",
    "Paris",
    "Lisbon",
    "Madrid",
  ];
  const [city, setCity] = useState("cairo");
  const [data, setData] = useState({
    name: "Cairo",
    dt: "",
    main: "",
    weather: [""],
    wind: "",
    sys: "",
  });

  useEffect(() => {
    getWeather(city)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h5 className="fw-blod text-light">Choose Your Country:</h5>
        <select
          className="form-select text-bg-secondary"
          aria-label="Default select example"
          onChange={handleCityChange}
        >
          {cities.map((c) => (
            <option key={c} value={c} className="fw-bold">
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="container py-5">
        <div className="card text-bg-secondary w-100">
          <div className="card-body">
            <h4 className="card-title d-flex justify-content-between">
              {data.name}
              <span className="span">
                {/* convert from Unix timestamp ex. dt=(1721895671) to a traditional date format */}
                {Date(data.dt * 1000)
                  .toString()
                  .substring(0, 15)}
              </span>
            </h4>
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt="Weather icon"
            ></img>
            <p className="card-text fw-bold">
              Temperature:{" "}
              <span className="fw-bolder fs-5">{data.main.temp}</span>°C
            </p>
            <p className="card-text fw-bold">
              Wind Speed:{" "}
              <span className="fw-bolder fs-5">{data.wind.speed}</span> m/sec
              <br />
              Wind Direction:{" "}
              <span className="fw-bolder fs-5">{data.wind.deg}</span> degrees
              (meteorological)
            </p>
            <p className="card-text fw-bold">
              Weather Description : {data.weather[0].description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default App;
