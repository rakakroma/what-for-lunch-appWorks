
function WeatherContent({ weatherData, saveList, townNum, showWhat, setShowWhat }) {
    if (!weatherData) {
        return
    }

    const GetTownData = function (num) {
        return {
            observeTime: weatherData.location[num].time.obsTime,
            locationName: weatherData.location[num].locationName,
            currentTemperature: parseFloat(weatherData.location[num].weatherElement[0].elementValue),
            currentHumidity: parseFloat(weatherData.location[num].weatherElement[1].elementValue),
            rainfallIn24HR: parseFloat(weatherData.location[num].weatherElement[2].elementValue),
            theRemainder: function () {
                return (this.currentTemperature * 10 +
                    this.currentHumidity * 100 +
                    this.rainfallIn24HR * 10) %
                    saveList.length
            },
        }
    }

    if (showWhat === `Town${townNum}`) {
        return (<>
            <div>
                {GetTownData(townNum).locationName}觀測站<br />
                資料時間：{GetTownData(townNum).observeTime
                }<br />
                溫度是{GetTownData(townNum).currentTemperature}℃
                <br />
                濕度是{GetTownData(townNum).currentHumidity * 100 + "%"}
                <br />
                24小時內降雨量是{GetTownData(townNum).rainfallIn24HR}
                <br />
                ({GetTownData(townNum).currentTemperature * 10} +
                {GetTownData(townNum).currentHumidity * 100} +
                {GetTownData(townNum).rainfallIn24HR * 10}) /
                {saveList.length}
                <h1 className="text-xl">               餘數為 {
                    GetTownData(townNum).theRemainder()
                } !</h1>
                <div className="text-xl">
                    {
                        GetTownData(townNum).theRemainder() === 0 ?
                            saveList[saveList.length - 1].name :
                            saveList[GetTownData(townNum).theRemainder() - 1].name
                    }
                </div>
                <button className="p-3 bg-slate-100" onClick={() => setShowWhat("")}>確定</button>
            </div>
        </>)
    } else {
        return
    }
}


export default WeatherContent