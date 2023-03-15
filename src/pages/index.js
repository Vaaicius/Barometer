import Head from "next/head";
import { Inter } from "next/font/google";
import Buttons from "./components/buttons";
import { useEffect, useState } from "react";
import "../styles/Home.module.css";
import {
  WiThunderstorm,
  WiRainMix,
  WiHot,
  WiDayCloudy,
  WiDaySunny,
  WiDirectionUp,
  WiDirectionDown,
} from "react-icons/wi";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  // Fetch data from external API
  const initialData = await fetchWeather("Vilnius");
  return { props: { initialData } };
}

async function fetchWeather(city) {
  const res = await fetch(`http://localhost:3000/api/barometer?city=${city}`);
  const data = await res.json();
  return data;
}

export default function Home({ initialData }) {
  const [city, setCity] = useState("Vilnius");
  const [data, setData] = useState(initialData);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    loadWeather(city);
  }, [city]);

  const handleCityClick = (e) => {
    console.log(e);
    setCity(e);
    if (e === "Nida" || e === "Vilnius") {
      setShowText(!showText);
    }
  };

  const loadWeather = async (newCity) => {
    const newData = await fetchWeather(newCity);
    setData(newData);
  };

  return (
    <>
      <Head>
        <title>Barometer</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="container">
          <Buttons onClickedCity={handleCityClick} />
        </div>
        <div className="container-two">
          <div className="circle">
            <div className="out">
              <div className="positionThunderstorm">
                <WiThunderstorm size={25} />
              </div>
              <div className="positionRainMix">
                <WiRainMix size={25} />
              </div>
              <div className="positionDayCloudy">
                <WiDayCloudy size={25} />
              </div>
              <div className="positionDaySunny">
                <WiDaySunny size={25} />
              </div>
              <div className="positionHot">
                <WiHot size={25} />
              </div>
              <div className="positionmbar">mbar</div>
              <div className="position960">960</div>
              <div className="position980">980</div>
              <div className="position1000">1000</div>
              <div className="position1030">1030</div>
              <div className="position1050">1050</div>
              <div className="position1070">1070</div>
              <div className="positionmbartwo">mbar</div>

              <div className="in">
                <div className="insideCircle">
                  <div className="data-pressure data">
                    <h1 className="data-name data">
                      {"Pressure in " + data.city.name}
                    </h1>
                    <h1 className="data-pressure data">
                      {data.list[1].main.pressure + " mbar"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="valandinistekstas">
            <p>{!showText && data.list[0].dt_txt}</p>
            <p>
              {!showText &&
                data.city.name + " " + data.list[0].main.pressure + ` mbar`}
            </p>
          </div>
          <div className="valandinistekstasdu">
            <p>{showText && data.list[0].dt_txt}</p>
            <p>
              {showText &&
                data.city.name + " " + data.list[0].main.pressure + ` mbar`}
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
