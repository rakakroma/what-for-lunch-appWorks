import { useState } from "react";
import WeatherRule from './WeatherRule';
import DecisionButton from './weatherAPI';

export default function WeatherStuff({ saveList, setTheChosenId, decisionButtonStyleClass }) {
    const [showWhat, setShowWhat] = useState("")

    const handleShowRuleClick = () => {
        if (showWhat !== "showRule") {
            setShowWhat("showRule")
        } else {
            setShowWhat("")
        }
    }

    return (
        <div className='bg-emerald-50'>以現在的天氣
            <br />
            <WeatherRule onClick={handleShowRuleClick} showWhat={showWhat} className={decisionButtonStyleClass} />
            <DecisionButton className={decisionButtonStyleClass} saveList={saveList} showWhat={showWhat} setShowWhat={setShowWhat}
                setTheChosenId={setTheChosenId} townNum={0} />
            <DecisionButton className={decisionButtonStyleClass} saveList={saveList} showWhat={showWhat} setShowWhat={setShowWhat}
                setTheChosenId={setTheChosenId} townNum={2} />
        </div>)
}