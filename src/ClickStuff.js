
import { useEffect, useState } from "react"

export default function ClickStuff({ clickTimeSum, setClickTimeSum, saveList, setTheChosenId }) {
    const [countdownLeft, setCountdownLeft] = useState(0)
    // const [clickTimeSum, setClickTimeSum] = useState(0)



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
        return <div className="flex fixed inset-0 z-20 w-screen h-screen bg-opacity-50 bg-slate-300">
            <div className="m-auto bg-white p-5 ">
                <button className="bg-yellow-300 active:bg-red-300" onClick={clickTimeHandler}>CLICK ME!</button>
            </div>
        </div>;
    } else {
        return
    }
}

function ClickResult({ setCountdownLeft, countdownLeft, clickTimeSum, setClickTimeSum, saveList, setTheChosenId }) {

    const [hideClickResult, setHideClickResult] = useState(false)

    // useEffect(() => {
    //     if (clickTimeSum > 0 && countdownLeft === 0) {
    //         const timeout = setTimeout(() => {
    //             setHideClickResult(true)
    //             console.log("結束")
    //         }, 4000);
    //     }
    // }, [clickTimeSum, setHideClickResult, countdownLeft]);

    if (hideClickResult) {
        return <button className="p-2 hover:bg-orange-400" onClick={() => setCountdownLeft(3)}>開始</button>
    }


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



        return <div className="flex fixed inset-0 z-20 w-screen h-screen bg-opacity-50 bg-slate-300">
            <div className="m-auto bg-white p-5 ">
                <p>本次點擊次數： {clickTimeSum} </p>
                <p>結果為：{theChosen.name}</p>
                <button className="p-3 bg-slate-100" onClick={() => setHideClickResult(true)}>確定</button>
            </div>
        </div>;
    }
}