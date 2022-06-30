import { useState, useEffect } from "react";
export default function DecisionInfoBlock({ showWhat, setShowWhat, ...props }) {

    useEffect(() => {
        if (showWhat === "Town0" || showWhat === "Town2") {
            const timeout = setTimeout(() => {
                setShowWhat("");
                console.log("結束")
            }, 15000);
        }
    }, [setShowWhat, showWhat]);


    switch (showWhat) {
        case "showRule":
            return <div >
                根據中央氣象局即時觀測資料，以該觀測站之<b>溫度</b>(℃ *10)、<b>濕度</b>(% *100)、<b>24小時內降雨量</b>（mm *10）之總和，除以<b>餐廳選項數</b>，取得<b>餘數</b>。
                <br />
                餘數的數字 x 代表第 x 個選項被選中，當數字整除（餘數為0），則最後一項被選中。
            </div>;

        case "showError":
            return <div>
                出現錯誤，無法取得資料，請重試或採取其他方法。
            </div>;
        case "Town0":
            return <div className="flex fixed inset-0 z-20 w-screen h-screen bg-opacity-50 bg-slate-300">
                <div className="m-auto bg-white p-5 ">{props.children}</div>
            </div>;
        case "Town2":
            return <div className="flex fixed inset-0 z-20 w-screen h-screen bg-opacity-50 bg-slate-300">
                <div className="m-auto bg-white p-5 ">{props.children}</div>
            </div>;

        default:
            return <div>{props.children}</div>;
    }
}

