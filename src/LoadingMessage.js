import { useEffect } from "react";

export default function LoadingMessage({ loadingPosition, setLoadingPosition }) {

    useEffect(() => {
        if (loadingPosition || loadingPosition !== "loading") {
            const timeout = setTimeout(() => {
                console.log("清除loadingMessage")
                setLoadingPosition("");
            }, 6000);
        }
    }, [loadingPosition]);

    switch (loadingPosition) {
        case "":
            return <h1></h1>;
        case "error":
            return <div>無法取得定位資訊，可能不支援或未取得權限。可以用搜尋地標來定位。</div>;
        case "success":
            return <div>已取得定位資訊！</div>;
        case "loading":
            return <div>存取定位資訊中...</div>;
    }
}