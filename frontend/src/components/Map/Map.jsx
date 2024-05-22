import { useState, useRef } from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useGeoLocaton } from "../../Hooks/useGeoLocaton";
export const Map = () => {
  const [darkMode, setDarkMode] = useState(false);
  const mapRef = useRef();
  //markers
  const markers = [
    {
      geocode: [40.6487492741879, -73.95008611696765],
      popup: "67th Precient - NYPD",
    },
    {
      geocode: [40.664596269110625, -73.94782483573144],
      popup: "71st Precient - NYPD",
    },
    {
      geocode: [40.66803407514557, -73.9594997405095],
      popup: "32nd Precient - NYPD",
    },
    {
      geocode: [40.67479034721176, -73.93039380555055],
      popup: "77th Precient - NYPD",
    },
    {
      geocode: [40.64978110258413, -73.97111029695564],
      popup: "NYPD Strategic Response Group 3",
    },
    {
      geocode: [40.62796996564086, -73.94152475276753],
      popup: "63rd Precinct - NYPD",
    },
    {
      geocode: [40.69013431063829, -73.9604157337517],
      popup: "88th Precinct - NYPD",
    },
    {
      geocode: [40.63048350023303, -73.97375154235755],
      popup: "70th Precinct - NYPD",
    },

    {
      geocode: [40.65831835636027, -74.00087977056964],
      popup: "72nd Precinct - NYPD",
    },
    {
      geocode: [40.68884259733375, -73.94486501658386],
      popup: "79th Precinct - NYPD",
    },
    {
      geocode: [40.67094369616391, -73.91355109265822],
      popup: "73rd Precinct - NYPD",
    },
    {
      geocode: [40.625658770718346, -73.99133363804914],
      popup: "66th Precinct - NYPD",
    },
    {
      geocode: [40.64858532082476, -73.90506651413445],
      popup: "69th Precinct - NYPD",
    },
  ];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1417/1417847.png",
    iconSize: [38, 38],
  });

  const location = useGeoLocaton();

  const showMyLocation = () => {
    if (location.loaded && !location.error) {
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        18,
        { animate: true }
      );
    } else {
      alert(location.error.message);
    }
  };

  const darkModeUrl =
    "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
  const lightModeUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <div
      className={`${
        darkMode ? "bg-[#242424] text-white" : "bg-white text-black"
      } h-100vh`}
    >
      {/* <div className="absolute top-4 right-4 flex items-center mt-2 ">
        <label className="flex cursor-pointer gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
      </div> */}

      <h1 className="text-center p-4 ">Map</h1>

      <MapContainer
        center={[40.64894927418784, -73.95008611696765]}
        zoom={30}
        ref={mapRef}
        className="h-100vh mb-1"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={darkMode ? darkModeUrl : lightModeUrl}
        />
        <MarkerClusterGroup chunkedLoading>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>
                <h2>{marker.popup}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <h2>You are here</h2>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {location.loaded && !location.error && (
        <div className="flex items-center justify-center ">
          <button
            className="bg-blue-400 m-3 p-2 rounded"
            onClick={showMyLocation}
          >
            Locate Me
          </button>
        </div>
      )}
    </div>
  );
};
