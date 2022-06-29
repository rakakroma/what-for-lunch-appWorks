
import { useEffect, useState } from "react"

export default function ClickStuff({ saveList, setTheChosenId }) {
    const [countdownLeft, setCountdownLeft] = useState(0)
    const [clickTimeSum, setClickTimeSum] = useState(0)



    return <div className="bg-orange-50 p-3">
        <h1 className="text-xl">以5秒內點擊數決定</h1>
        <ClickArea countdownLeft={countdownLeft} setClickTimeSum={setClickTimeSum} clickTimeSum={clickTimeSum} setCountdownLeft={setCountdownLeft} />
        <ClickResult setCountdownLeft={setCountdownLeft} countdownLeft={countdownLeft} clickTimeSum={clickTimeSum} saveList={saveList} setTheChosenId={setTheChosenId} setClickTimeSum={setClickTimeSum} />

    </div>
}

function ClickArea({ countdownLeft, setCountdownLeft, setClickTimeSum, clickTimeSum }) {

    useEffect(() => {
        if (countdownLeft) {
            const timeout = setTimeout(() => {
                setCountdownLeft(0);
                console.log("結束")
            }, 5000);
        }
    }, [countdownLeft]);

    const clickTimeHandler = () => {
        setClickTimeSum(clickTimeSum + 1)
    }

    if (countdownLeft > 0) {
        return <button className="bg-yellow-300 active:bg-red-300" onClick={clickTimeHandler}>CLICK ME!</button>
    } else {
        return
    }
}

function ClickResult({ setCountdownLeft, countdownLeft, clickTimeSum, setClickTimeSum, saveList, setTheChosenId }) {
    if (countdownLeft === 0 && clickTimeSum === 0) {
        return <button className="p-2 hover:bg-orange-400" onClick={() => setCountdownLeft(3)}>開始</button>


    } else if (countdownLeft > 0) {
        return
    } {
        const remainder = clickTimeSum % saveList.length;

        const theChosen = remainder === 0 ?
            saveList[saveList.length - 1] :
            saveList[remainder - 1]

        setTheChosenId(theChosen.placeId)



        return <div>
            <p>本次點擊次數： {clickTimeSum} </p>
            <p>結果為：{theChosen.name}</p>

            <button className="bg-red-100 self-end" onClick={() => {
                setClickTimeSum(0);
                setTheChosenId("")
            }}> 放棄？ </button>

        </div >
    }
}