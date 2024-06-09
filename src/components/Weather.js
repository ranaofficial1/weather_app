import React, {useState,useEffect} from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdAir } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";

export default function Weather() {
    const [city, setCity] = useState("delhi");
    const [weather, setWeather] = useState();
    const [error, setError] = useState();

  const API_KEY = "8ab5a0f67ac4212fe17d9564bb8437b6";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
        fetchData();
    }
  }
 useEffect(()=>{
    fetchData();
 },[])

  const fetchData = async () => {
    try{
        let response = await fetch(url);
        let res = await response.json();
        if(response.ok){
            setWeather(res);
            console.log(res);
            setError('')
        }
        else{
            setError('No Data Found')
        }
        
    }catch{

    }
  }

  const handleInputChange = (e) => {
    setCity(e.target.value)
  }


  return (
    <>
      <div className="container mx-auto bg-red-200 w-1/5 rounded-lg h-[450px]">
        <div className="grid grid-cols-3 gap-4 pt-8 px-8">
          <input type="text" value={city} onKeyDown={handleKeyPress} onChange={handleInputChange} className="rounded-2xl shadow-lg py-1 col-span-2 ps-3" />
          <button onClick={() => fetchData()} className="bg-green-500 text-white rounded-md shadow-lg">Search</button>
        </div>
        {
            error && <p className="text-red-500 text-center mt-5 font-bold">{error}</p>
        }
        {
            weather && weather.weather &&
            <>
                <div className="flex flex-col text-center items-center justify-center">
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        className="img-fluid rounded-top"
                        alt=""
                    />
                    
                    <p className="text-lg font-semibold capitalize">{weather.weather[0].description}</p>
                </div>
                <div className="flex flex-col text-center items-center justify-center my-3">
                    <p className="font-semibold text-5xl text-pink-700">{weather.main.temp}<span>&deg;C</span></p>
                </div>
                <div className="flex text-center items-center justify-center">
                    <FaLocationDot />
                    <p className="font-semibold text-lg ps-2">{weather.name},{weather.sys.country}</p>
                </div>
                <div className="flex gap-4 justify-center mt-5 pb-5">
                    <div className="flex flex-col justify-center text-center items-center bg-white shadow-xl p-3 rounded-md w-32">
                        <div className="text-3xl">
                            <MdAir />
                        </div>
                        <div>
                            <p className="font-semibold">{weather.wind.speed} Km/h</p>
                            <p className="font-semibold">Wind Speed</p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center text-center items-center bg-white shadow-xl p-3 rounded-md w-32">
                        <div className="text-3xl">
                            <WiHumidity />
                        </div>
                        <div>
                            <p className="font-semibold">{weather.main.humidity} %</p>
                            <p className="font-semibold">Humidity</p>
                        </div>
                        
                    </div>
                </div>
            </>
        }
        
      </div>
    </>
  );
}
