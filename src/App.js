import './App.css';
import { useRef, useEffect, useState } from 'react';
import { Wrapper } from "@googlemaps/react-wrapper";
import WeatherStuff from './WeatherStuff';
import LoadingMessage from './LoadingMessage';
import ClickStuff from './ClickStuff';

const MyApp = () => (
  <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEYS} libraries={["places"]}>
    <MyMapComponent />
  </Wrapper>
);

// 整個頁面都會用到google map的功能，所以目前都放入MyMapComponent中
function MyMapComponent(
) {
  const [center, setCenter] = useState(
    JSON.parse(localStorage.getItem('last-time-center')) ||
    {
      lat: 23.553118,
      lng: 121.0211024
    });
  const [zoom, setZoom] = useState(JSON.parse(localStorage.getItem('last-time-zoom')) || 8)
  const [saveList, setSaveList] = useState(JSON.parse(localStorage.getItem('my-save-list')) || [])
  const [theChosenId, setTheChosenId] = useState("")
  const [loadingPosition, setLoadingPosition] = useState("")
  const [clickTimeSum, setClickTimeSum] = useState(0)


  const mapRef = useRef();

  const inputRef = useRef();

  const positionInputRef = useRef();

  let currentPosition = {
    lat: 24.245,
    lng: 120.53
  };


  function PositionHandler(position) {
    // console.log(position)
    currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setZoom(14);
    setCenter(currentPosition);
    setLoadingPosition("success")
    console.log("已取得定位 ")
  }

  function errorHandler(err) {
    console.log(err);
    setLoadingPosition("error")
    // alert('無法取得定位。您可能未開啟權限或瀏覽器不支援。')
  }

  function handlePositionClick() {
    console.log('正在取得定位')
    setLoadingPosition("loading")
    navigator.geolocation.getCurrentPosition(PositionHandler, errorHandler);
  }

  function handleSaveClick() {
    if (selectedRestaurant) {
      setSaveList(saveList.concat(selectedRestaurant))
    } else {
      console.log('請選擇餐廳再儲存喔🥰')
    }
  }

  function handleDeleteClick(e) {
    const theWantToDeleteId = e.target.parentNode.id
    setSaveList(saveList.filter(saveItem => saveItem.placeId !== theWantToDeleteId))
  }


  function MySaveList() {
    const listItems = saveList.map(saveItem => {
      if (saveItem.placeId === theChosenId) {
        return <li id={saveItem.placeId} key={saveItem.placeId} className='flex justify-between bg-fuchsia-200'>
          <b>{saveItem.name}</b>
          <button className="bg-red-100 self-end" onClick={() => {
            setClickTimeSum(0);
            setTheChosenId("")
          }}> 放棄？ </button>        </li>
      }
      return <li id={saveItem.placeId} key={saveItem.placeId} className='flex justify-between'>
        <b>{saveItem.name}</b>
        <button onClick={handleDeleteClick}>❌</button>
      </li>
    });
    return <ul className=' bg-slate-100 divide-y-2 divide-gray-100'> {listItems}</ul >;
  }

  useEffect(() => {
    localStorage.setItem('my-save-list', JSON.stringify(saveList));
  }, [saveList]);

  useEffect(() => {
    localStorage.setItem('last-time-center', JSON.stringify(center));
  }, [center])

  useEffect(() => {
    localStorage.setItem('last-time-zoom', JSON.stringify(zoom));
  }, [zoom])


  let boundPosition;
  let selectedRestaurant;
  let marker;
  let directionsService;
  let directionsRenderer;
  let infoWindow;
  let selectedPlace;



  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
    });
    boundPosition = map.getCenter();
    console.log("boundPosition" + boundPosition)
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['restaurant'],
      bounds: {
        east: boundPosition.lng() + 0.01,
        west: boundPosition.lng() - 0.01,
        south: boundPosition.lat() - 0.01,
        north: boundPosition.lat() + 0.01,
      },
      strictBounds: false,
    })
    //用搜尋定位
    const searchPositionAutocomplete = new window.google.maps.places.Autocomplete(positionInputRef.current, {
      bounds: {
        east: boundPosition.lng() + 2,
        west: boundPosition.lng() - 2,
        south: boundPosition.lat() - 2,
        north: boundPosition.lat() + 2,
      },
      strictBounds: false,
    })
    searchPositionAutocomplete.addListener('place_changed', function () {
      const searchPositionPlace = searchPositionAutocomplete.getPlace();
      selectedPlace = {
        location: searchPositionPlace.geometry.location,
        placeId: searchPositionPlace.place_id,
        name: searchPositionPlace.name,
        address: searchPositionPlace.formatted_address,
      };
      console.log(selectedPlace.location)

      map.setCenter(searchPositionPlace.location);
      setCenter({ lat: selectedPlace.location.lat(), lng: selectedPlace.location.lng() })
      setZoom(14)
      setLoadingPosition("success")
    })

    //
    autocomplete.addListener('place_changed', function () {
      const place = autocomplete.getPlace();
      console.log(place)
      selectedRestaurant = {
        location: place.geometry.location,
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        phoneNumber: place.formatted_phone_number,
        rating: place.rating,
        ratingTotal: place.user_ratings_total,
      };

      map.setCenter(selectedRestaurant.location);


      if (!marker) {
        marker = new window.google.maps.Marker({
          map: map
        });
      }

      marker.setPosition(selectedRestaurant.location);

      if (!directionsService) {
        directionsService = new window.google.maps.DirectionsService();
      }

      if (!directionsRenderer) {
        directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: map,
        });
      }

      directionsRenderer.set('directions', null);

      directionsService.route({
        origin: new window.google.maps.LatLng(
          boundPosition.lat(),
          boundPosition.lng(),
        ),
        destination: {
          placeId: selectedRestaurant.placeId,
        },
        travelMode: 'DRIVING',
      },
        function (response, status) {
          console.log(response);

          if (status === "OK") {
            directionsRenderer.setDirections(response);

            if (!infoWindow) {
              infoWindow = new window.google.maps.InfoWindow();
            }

            infoWindow.setContent(
              `<h2 class="text-xl">🍽️ <b> ${selectedRestaurant.name} </b>🍽️</h2>
              <div>🗺️ 地址：${selectedRestaurant.address}</div>
              <div>📞 電話：${selectedRestaurant.phoneNumber}</div>
              <div> 🌟🌟 /評分人數 🤩🤩：${selectedRestaurant.rating}/${selectedRestaurant.ratingTotal}</div>              
              <div>開車預估時間🚗 :${response.routes[0].legs[0].duration.text}</div>
              `
            );
            infoWindow.open(map, marker)
          }
        })
    })
  }
  );


  useEffect(() => {



    if (theChosenId) {
      const theChosenRestaurant = saveList.find(saveItem => { return saveItem.placeId === theChosenId })

      const map = new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });

      map.setCenter(theChosenRestaurant.location);


      if (!marker) {
        marker = new window.google.maps.Marker({
          map: map
        });
      }

      marker.setPosition(theChosenRestaurant.location);

      if (!directionsService) {
        directionsService = new window.google.maps.DirectionsService();
      }

      if (!directionsRenderer) {
        directionsRenderer = new window.google.maps.DirectionsRenderer({
          map: map,
        });
      }

      directionsRenderer.set('directions', null);

      directionsService.route({
        origin: new window.google.maps.LatLng(
          center.lat,
          center.lng,
        ),
        destination: {
          placeId: theChosenRestaurant.placeId,
        },
        travelMode: 'DRIVING',
      },
        function (response, status) {
          console.log(response);

          if (status === "OK") {
            directionsRenderer.setDirections(response);

            if (!infoWindow) {
              infoWindow = new window.google.maps.InfoWindow();
            }

            infoWindow.setContent(
              `<h2 class="text-xl">🍽️ <b> ${theChosenRestaurant.name} </b>🍽️</h2>
            <div>🗺️ 地址：${theChosenRestaurant.address}</div>
            <div>📞 電話：${theChosenRestaurant.phoneNumber}</div>
            <div> 🌟🌟 /評分人數 🤩🤩：${theChosenRestaurant.rating}/${theChosenRestaurant.ratingTotal}</div>              
            <div>開車預估時間🚗 :${response.routes[0].legs[0].duration.text}</div>
            `
            );
            infoWindow.open(map, marker)
          }
        })
    }
  }, [theChosenId]);

  const decisionButtonStyleClass = 'hover:text-teal-50 hover:bg-slate-400 rounded max-h-9 text-sm py-2 px-4 min-w-fit border'


  return (
    <>
      <div className='h-screen w-1/2 p-10 '>
        <h1 className='text-3xl mt-4 '>決定要吃什麼？
        </h1>
        <LoadingMessage loadingPosition={loadingPosition} setLoadingPosition={setLoadingPosition} />
        <button
          className="m-4 bg-slate-50 text-gray-600 hover:text-teal-50 hover:bg-slate-400 shadow-sm font-semibold rounded max-h-9 text-sm py-2 px-4 min-w-fit border"
          onClick={handlePositionClick}>自動取得定位資訊</button> 或
        <input className='w-3/5' ref={positionInputRef} placeholder="我想用地圖搜尋來定位..." />
        <input ref={inputRef} className='w-1/2 m-2 border h-10 border-b-teal-700' placeholder=" 我想找吃的..　(*´Д｀)" />
        <button className='hover:bg-teal-400 p-2' onClick={handleSaveClick}> 儲存到清單 💾</button>
        <div className='rounded-lg shadow-lg'>
          <h2 className='text-xl m-2'>餐廳清單💫<em className='text-sm'> 目前共儲存 {saveList.length} 個地點</em></h2>
          <MySaveList />
        </div>

        <div className='mt-5'>
          <WeatherStuff decisionButtonStyleClass={decisionButtonStyleClass} saveList={saveList} setTheChosenId={setTheChosenId}></WeatherStuff>
          <ClickStuff clickTimeSum={clickTimeSum} setClickTimeSum={setClickTimeSum} saveList={saveList} setTheChosenId={setTheChosenId} />
          {/* <App2 /> */}
        </div>
      </div>
      <div ref={mapRef} id="map" className='h-screen w-1/2' />
    </>
  );
}

function App() {
  return (

    <div className="App flex" >
      <MyApp />
    </div>
  );
}

export default App;
