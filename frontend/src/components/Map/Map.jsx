import { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet-rotatedmarker";
const RotatedMarker = ({ position, rotationAngle }) => {
  const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1417/1417847.png",
    iconSize: [38, 38],
    className: "",
  });

  return (
    <Marker
      position={position}
      icon={icon}
      rotationAngle={rotationAngle}
      rotationOrigin="center center"
    />
  );
};

export const Map = () => {
  const [locationData, setLocationData] = useState({
    lat: 0,
    lng: 0,
    header: 0,
  });
  const [lat, setLat] = useState("23");
  const [lng, setLng] = useState("23");
  const [header, setHeader] = useState("23");
  const [rAngle, setRAngle] = useState(0);
  const mapRef = useRef();

  const lightModeUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/gpsstatus");
        const newLocationData = response.data;
        console.log("Response from server:", newLocationData);
        console.log("Current location data:", locationData);

        // Update location data if it has changed
        if (
          newLocationData.lat !== locationData.lat ||
          newLocationData.lng !== locationData.lng ||
          newLocationData.header !== locationData.header
        ) {
          updateLocationData(newLocationData);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    const updateLocationData = (newLocationData) => {
      setLocationData(newLocationData);
      console.log("locationData after setting:", newLocationData);
      const newPosition = [newLocationData.lat, newLocationData.lng];
      mapRef.current.setView(newPosition, 20, {
        animate: true,
        duration: 1, // Animation duration in seconds
      });

      const newRotationAngle = parseFloat(newLocationData.header) || 0;
      setRAngle(newRotationAngle);
      console.log("rotationAngle = ", rAngle);
    };

    fetchLocationData();

    const interval = setInterval(fetchLocationData, 1000);

    return () => clearInterval(interval);
  }, [locationData]); // Add locationData as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/gpsstatus", { lat, lng, header })
      .then((response) => {
        // After successful POST request, make a GET request to fetch updated location data
        console.log("posted successfully");
        axios
          .get("http://localhost:3000/gpsstatus")
          .then((response) => {
            // Update location data with the response data
            console.log(response.data);
            setLocationData(response.data);

            // Focus the map on the new marker with animation
            const newPosition = [response.data.lat, response.data.lng];
            mapRef.current.setView(newPosition, 20, {
              animate: true,
              duration: 1, // Animation duration in seconds
            });
          })
          .catch((error) => {
            console.error("Error fetching location data:", error);
          });
      })
      .catch((error) => {
        console.error("Error updating GPS status:", error);
      });
  };

  return (
    <>
      <MapContainer
        center={[40.64894927418784, -73.95008611696765]}
        zoom={15}
        ref={mapRef}
        className="mb-1 mt-6"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={lightModeUrl}
        />

        {locationData && !locationData.error && (
          <RotatedMarker
            position={[locationData.lat, locationData.lng]}
            rotationAngle={90}
          />
        )}
      </MapContainer>

      {/* Form */}
      <div className="flex justify-center h-screen bg-white pb-[40px]">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 max-h-[425px]">
          <form className="card-body" onSubmit={handleSubmit}>
            <h2>Change GPS Marker</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Latitude</span>
              </label>
              <input
                name="lat"
                type="number"
                placeholder="Latitude"
                className="input input-bordered"
                required
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Longitude</span>
              </label>
              <input
                name="lng"
                type="number"
                placeholder="Longitude"
                className="input input-bordered"
                required
                value={lng}
                onChange={(e) => setLng(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Header</span>
              </label>
              <input
                name="header"
                type="text"
                placeholder="Header"
                className="input input-bordered"
                required
                value={header}
                onChange={(e) => setHeader(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
