import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLocationDot,
  faMagnifyingGlass,
  faSun,
  faCloud,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Navbar from "./components/navbar";
import "./App.css";

function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [currentHour, setCurrentHour] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    callAPI("karachi");
  }, []);

  const callAPI = async (cityName) => {
    try {
      const data = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8de958767e7c75bf86a139527b02ad2&units=metric`
      );
      setWeatherData(data.data);
      console.log(data.data)
    } catch (error) {
      console.log(error.message, "error aya hai ");
    }
  };

  const handlerWeatherApi = async (e) => {
    e.preventDefault();
    callAPI(searchInput);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const dateOptions = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      const hourOptions = { hour: "2-digit", minute: "2-digit" };

      const formattedDate = now.toLocaleDateString("en-US", dateOptions);
      const formattedHour = now.toLocaleTimeString("en-US", hourOptions);

      setCurrentDate(formattedDate);
      setCurrentHour(formattedHour);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getWeatherIcon(condition) {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes("clear")) {
      return faSun;
    } else if (lowerCaseCondition.includes("cloud")) {
      return faCloud;
    } else if (lowerCaseCondition.includes("rain") || lowerCaseCondition.includes("shower")) {
      return faCloudShowersHeavy;
    } else {

      return faSun;
    }
  }



  return (
    <>
      <Navbar />
      <div className="main-div">
        <div className="main-nested-1">
          <div className="main-1">
            <h2>Welcome To Weather App</h2>
            <button className="mybtn">
              Weather Updates{" "}
              <FontAwesomeIcon className="icon-1" icon={faArrowRight} />
            </button>
          </div>
        </div>
        <div className="main-nested-2">
          <div className="main-2">
            <div className="search-div">
              <form onSubmit={handlerWeatherApi}>
                <FontAwesomeIcon icon={faLocationDot} className="icon-2" />
                <input
                  type="text"
                  placeholder="Enter Your City"
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="icon-3">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>
            </div>
            <div className="content-div">
              {weatherData.weather && weatherData.weather.length > 0 && (
                <FontAwesomeIcon className="fonts"
                  icon={getWeatherIcon(weatherData.weather[0].description)}
                />
              )}
              <h4>Temp : {weatherData.main?.temp}</h4>
              <h4>City : {weatherData.name}</h4>
              <h4>Amb : {weatherData.weather && weatherData.weather[0].main}</h4>

              <div className="content-hour">
                <p>{currentHour}</p>
              </div>
              <div className="content-date">
                <p>{currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
