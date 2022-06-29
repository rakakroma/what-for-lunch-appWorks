

import { useState } from 'react';
import WeatherContent from './WeatherContent';


function DecisionButton({ saveList, setTheChosenId, townNum, className, showWhat, setShowWhat, weatherData, setWeatherData }) {



    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const townList = {
        0: '苗栗縣獅壇鄉',
        1: '新竹市海天一線',
        2: '台東縣下馬',
        3: '苗栗縣泰安鄉'
    }

    const currentTaiwanTimeHour = new Date().getUTCHours() + 8

    // if (weatherData &&
    //     new Date(weatherData.location[0].time.obsTime).getHours() ===
    //     currentTaiwanTimeHour) {
    //     console.log("已儲存最新天氣資訊，不與伺服器要求新資料")
    //     // setShowWhat(`Town${townNum}`)

    //     // console.log(weatherData.location[0].time.obsTime)
    //     // console.log(new Date(weatherData.location[0].time.obsTime).getHours())
    // }

    const handleDecisionClick = async () => {
        // setIsLoading(true);

        if (showWhat === `Town${townNum}`) {
            setShowWhat("")
            return <button onClick={handleDecisionClick} className={className}>用<b>{townList[townNum]}</b>的天氣決定！</button>

        }

        try {
            const response = await fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0001-001?Authorization=${process.env.REACT_APP_WEATHER_API_KEYS}&limit=25&offset=0&format=JSON&stationId=C0E820,C0E610,C0D670,C0S660&elementName=TEMP,HUMD,H_24R&parameterName=CITY,TOWN`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`);
            }

            const theWeatherData = await response.json();
            setShowWhat(`Town${townNum}`)

            setWeatherData(theWeatherData.records);

            const ToGetTownData = (num) => {
                if (theWeatherData.records) {
                    return {
                        currentTemperature: parseFloat(theWeatherData.records.location[num].weatherElement[0].elementValue),
                        currentHumidity: parseFloat(theWeatherData.records.location[num].weatherElement[1].elementValue),
                        rainfallIn24HR: parseFloat(theWeatherData.records.location[num].weatherElement[2].elementValue),
                        theRemainder: function () {
                            return (this.currentTemperature * 10 +
                                this.currentHumidity * 100 +
                                this.rainfallIn24HR * 10) %
                                saveList.length
                        },
                    }
                }
            }

            setTheChosenId(ToGetTownData(townNum).theRemainder() === 0 ?
                saveList[saveList.length - 1].placeId :
                saveList[ToGetTownData(townNum).theRemainder() - 1].placeId
            )


        } catch (err) {
            setErr(err.message);
            setShowWhat("showError")
        }
        // finally {
        //     setIsLoading(false);
        // }
    };


    if (showWhat === `Town${townNum}`) {
        return (
            <>
                <button onClick={handleDecisionClick} style={{ backgroundColor: "#55d975" }} className={className}>用<b>{townList[townNum]}</b>的天氣決定！</button>
            </>
        )
    } else {

        return <button onClick={handleDecisionClick} className={className}>用<b>{townList[townNum]}</b>的天氣決定！</button>


    }

}

export default DecisionButton

