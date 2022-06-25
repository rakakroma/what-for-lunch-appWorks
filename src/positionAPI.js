// nominatim for reverse geocoding
https://nominatim.openstreetmap.org/reverse?format=json&lat=25.03997&lon=121.511944&accept-language=zh-TW&zoom=16

// doc:
https://nominatim.org/release-docs/latest/

// POST メソッドの実装の例
async function postData(url = '', data = {}) {
    // 既定のオプションには * が付いています
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // 本文のデータ型は "Content-Type" ヘッダーと一致させる必要があります
    })
    return response.json(); // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈
}

postData('https://example.com/answer', { answer: 42 })
    .then(data => {
        console.log(data); // `data.json()` の呼び出しで解釈された JSON データ
    });
