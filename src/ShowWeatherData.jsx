import { useEffect, useState } from "react"
// import mainImg from "./Img/mainImg.png"
import "./index.css"
// import Haze from "./Img/haze.jpg";
// import weatherReporter from "./Img/weatherReporter.jpg"

  

const ShowWeatherData = ()=>{

    const[deg, setDeg] = useState("..");
    const[mindeg, setMinDeg] = useState("..");
    const[maxdeg, setMaxDeg] = useState("..");
    const[weather , setWeather] = useState("haze");
    const[place, setPlace] = useState("jaipur");
    const[country, setCountry] = useState("IN");
    const[icon,setIcon]=useState("50n");
    const[pressure,setPressure]=useState("..");
    const[humidity,setHumidity]=useState("..");

useEffect(()=>{

    const searchingArea = document.getElementById("searchingPoint");
    // const btn = document.getElementById("btn");
    // btn.addEventListener("click",()=>{
    //     setPlace(searchingArea.value);
    // })
    searchingArea.addEventListener("keypress",(keyboard)=>{
                  if(keyboard.key==="Enter"){
                      setPlace(searchingArea.value);
                      
                  }
})
    const fetchApi = async()=>{
        try{
        const Api=`http://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=6eaa63e18c0eeb019928ffe4dcd7ea3c`;
        const response = await fetch(Api);
        // console.log(response);
        const data = await response.json();

        // let citydata = data;
        if(data.cod===200){
        //    console.log(data);
        
        setDeg(`${data.main.temp} °Celsius`);
        setWeather(data.weather[0].main);
        // console.log(data.weather[0].main);
        setCountry(data.sys.country);
        // console.log(data.weather[0].icon);
        setIcon(data.weather[0].icon);
        setMinDeg(`mix Temp: ${data.main.temp_min} °Celsius`);
        setMaxDeg(`max Temp: ${data.main.temp_max} °Celsius`);
        setPressure(`Pressure: ${data.main.pressure} mb`);
        setHumidity(`Humidity: ${data.main.humidity}%`);
    }
    else{
        setDeg("");
        setCountry("");
        setPlace("Not found");
        setWeather("");
        setIcon("");
        setMinDeg("");
        setMaxDeg("");
        setPressure("");
        setHumidity("");

    }
    }
    catch{(console.error())

    }
        
        
    }

    fetchApi();
    // fetchApi();
    
},[place]);
// let imgAddress=[`http://openweathermap.org/img/wn/${icon}@2x.png`];

    let placeAndCountry = `${place},${country}`;

    // let bigImg ="";
    // const myStyle={backgroundImage:`url("./Img/haze.jpg")`};
    return <>
      <section className={`w-full lg:h-[90vh]  ${icon==='50n' ?"moreInfoImg":"bgImg"}`}>

        <input type="search" placeholder=" Search.." id="searchingPoint" className="h-14 mt-10 ml-6 sm:ml-32 w-[60vw] sm:w-[70vw] lg:w-[30vw] rounded-[32px] px-5 font-semibold text-2xl bg-transparent border-b-2 border-black shadow-2xl"/>
        {/* <button id="btn">Ding</button> */}


        <div className="flex lg:flex-row flex-col items-center lg:items-start justify-between">
        <div className="sm:h-[40vh] h-[60vh] lg:w-[40vw] w-[90vw] flex flex-col sm:flex-row sm:justify-around sm:gap-0 gap-3 justify-center items-center bg-transparent mt-10 lg:ml-32 rounded-[32px] shadow-2xl">
            <div className="font-bold sm:font-medium">
            <h1 className="sm:text-5xl text-4xl capitalize">{placeAndCountry}</h1>
            <h2 className="sm:text-3xl text-3xl sm:mt-5 mt-2">{deg}</h2>
            <h3 className="sm:text-2xl text-2xl mt-1">{weather}</h3>
            {/* <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="img"/> */}
            </div>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} className="bg-transparent shadow-2xl contrast-50" alt="img"/>
        </div>
           <div className={`sm:h-[40vh] h-[60vh] lg:w-[40vw] w-[90vw] lg:mr-10 bg-transparent mt-10 lg:ml-32 rounded-[32px] shadow-2xl`}>
            <h1 className="sm:text-4xl font-thin mt-5 ml-5 text-4xl capitalize">More Info:-</h1>
            <h2 className="mt-2 ml-5 font-bold">{maxdeg}</h2>
            <h2 className="mt-2 ml-5 font-bold">{mindeg}</h2>
            <h2 className="mt-2 ml-5 font-bold">{pressure}</h2>
            <h2 className="mt-2 ml-5 font-bold">{humidity}</h2>
            
           </div>
            {/* <img src={weatherReporter} className="sm:h-[40vh] h-[50vh] lg:w-[30vw] w-[90vw] rounded-3xl mb-10 lg:mr-32 mt-10 shadow-2xl" alt="" /> */}

        </div>
      </section>
    </>
}

export default ShowWeatherData;