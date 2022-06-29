
export default function DecisionInfoBlock({ showWhat, ...props }) {
    switch (showWhat) {
        case "showRule":
            return <div>
                {/* {props.children} */}
                根據中央氣象局即時觀測資料，以該觀測站之<b>溫度</b>(℃ *10)、<b>濕度</b>(% *100)、<b>24小時內降雨量</b>（mm *10）之總和，除以<b>餐廳選項數</b>，取得<b>餘數</b>。
                <br />
                餘數的數字 x 代表第 x 個選項被選中，當數字整除（餘數為0），則最後一項被選中。
            </div>;

        case "showError":
            return <div>
                出現錯誤，無法取得資料，請重試或採取其他方法。
            </div>
                ;
        default:
            return <div>{props.children}</div>;
    }
}

