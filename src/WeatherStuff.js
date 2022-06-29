import { useState } from "react";
import WeatherRuleButton from './WeatherRuleButton';
import DecisionButton from './weatherAPI';
import DecisionInfoBlock from "./DecisionInfoBlock";
import WeatherContent from "./WeatherContent";

export default function WeatherStuff({ saveList, setTheChosenId, decisionButtonStyleClass }) {
    const [showWhat, setShowWhat] = useState("")
    const [weatherData, setWeatherData] = useState();

    const handleShowRuleClick = () => {
        if (showWhat !== "showRule") {
            setShowWhat("showRule")
        } else {
            setShowWhat("")
        }
    }
    console.log(weatherData)

    return (
        <div className='bg-emerald-50 p-3'>
            <div className="text-xl">用現在的天氣決定
                <WeatherRuleButton onClick={handleShowRuleClick} className={decisionButtonStyleClass} showWhat={showWhat} />
            </div>
            <DecisionButton weatherData={weatherData} setWeatherData={setWeatherData} className={decisionButtonStyleClass} saveList={saveList} showWhat={showWhat} setShowWhat={setShowWhat}
                setTheChosenId={setTheChosenId} townNum={0} />
            <DecisionButton weatherData={weatherData} setWeatherData={setWeatherData} className={decisionButtonStyleClass} saveList={saveList} showWhat={showWhat} setShowWhat={setShowWhat}
                setTheChosenId={setTheChosenId} townNum={2} />

            <DecisionInfoBlock showWhat={showWhat} >
                <WeatherContent weatherData={weatherData} townNum={0} saveList={saveList} showWhat={showWhat} />
                <WeatherContent weatherData={weatherData} townNum={2} saveList={saveList} showWhat={showWhat} />
            </DecisionInfoBlock>

        </div>)
}