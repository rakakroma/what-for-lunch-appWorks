
export default function WeatherRule({ className, showWhat, onClick }) {


    if (showWhat === "showRule") {
        return <>
            <button onClick={onClick} className={className}>規則介紹</button>
            <div>
                根據中央氣象局即時觀測資料，將該觀測站的溫度、濕度、24小時內降雨量相加（小數點作為整數），除以餐廳選項數，取得餘數。
                <br />
                餘數的數字 x 代表第 x 個選項被選中，當數字整除（餘數為0），則最後一項被選中。
            </div>
        </>
    }
    return <button onClick={onClick} className={className}>規則介紹</button>


}