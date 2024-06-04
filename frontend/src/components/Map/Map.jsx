import { useState, useRef, useEffect } from "react"
import L from "leaflet"
import "./Map.css"
import navCursor from "../../assets/nc.svg"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import { MapContainer, TileLayer, Popup } from "react-leaflet"
import { Marker } from "react-leaflet"
import { Icon } from "leaflet"
import "leaflet-rotatedmarker"
import { Info } from "../Info/Info"

const RotatedMarker = ({ position, rotationAngle, mapRef }) => {
  const [marker, setMarker] = useState(null)

  useEffect(() => {
    const icon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/3253/3253113.png",
      iconSize: [45, 45],
      className: "",
    })

    if (marker) {
      // If marker exists, remove it before creating a new one
      marker.remove()
    }

    // Create a new marker with rotation angle
    const newMarker = L.marker(position, {
      icon,
      rotationAngle,
      rotationOrigin: "center center",
    }).addTo(mapRef.current)

    // Set the newly created marker
    setMarker(newMarker)

    // Clean up function to remove the marker when component unmounts
    return () => {
      if (marker) {
        marker.remove()
      }
    }
  }, [position, rotationAngle]) // Re-run effect when position or rotationAngle changes

  return null // Marker is created directly in the useEffect, so return null here
}

export default RotatedMarker

export const Map = () => {
  const [locationData, setLocationData] = useState({
    lat: 0,
    lon: 0,
    heading: 0,
  })
  const [lat, setLat] = useState(0)
  const [lon, setlon] = useState(0)
  const [heading, setHeading] = useState(0)
  const [errors, setErrors] = useState({})
  const [rAngle, setRAngle] = useState(0)
  const mapRef = useRef()

  const lightModeUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  const icon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1417/1417847.png",
    iconSize: [38, 38],
    className: "",
  })
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/gpsstatus")

        const newLocationData = response.data
        console.log("Response from server:", newLocationData)
        console.log("Current location data:", locationData)

        // Update location data if it has changed
        if (
          newLocationData.lat !== locationData.lat ||
          newLocationData.lon !== locationData.lon ||
          newLocationData.heading !== locationData.heading
        ) {
          updateLocationData(newLocationData)
        }
      } catch (error) {
        console.error("Error fetching location data:", error)
      }
    }

    const updateLocationData = async (newLocationData) => {
      setLocationData(newLocationData)
      setRAngle(locationData.heading)
      console.log("locationData after setting:", newLocationData)
      console.log(rAngle)
      const newPosition = [newLocationData.lat, newLocationData.lon]
      mapRef.current.setView(newPosition, 20, {
        animate: true,
        duration: 1, // Animation duration in seconds
      })

      const newRotationAngle = parseFloat(newLocationData.heading) || 0
      console.log("locationData after setting:", newLocationData)
      setRAngle(newRotationAngle) // Update the rotation angle state
      console.log("rotationAngle = ", newRotationAngle) // Log the new rotation angle
    }

    fetchLocationData()

    const interval = setInterval(fetchLocationData, 1000)

    return () => clearInterval(interval)
  }, [locationData])

  const validateForm = () => {
    const errors = {}
    const latNum = parseFloat(lat)
    const lngNum = parseFloat(lon)

    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      errors.lat = "Latitude must be a number between -90 and 90."
    }

    if (isNaN(lngNum) || lngNum <= -180 || lngNum > 180) {
      errors.lng = "Longitude must be a number between -180 and 180."
    }

    if (isNaN(header) || header <= 0 || header > 360) {
      errors.header = "Header must be a number between 0 and 360."
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      // Proceed with form submission
      await axios.post("http://localhost:3001/gpsstatus", { lat, lon, header }).then((response) => {
        // After successful POST request, make a GET request to fetch updated location data
        console.log("posted successfully")
        axios.get("http://localhost:3001/gpsstatus").then((response) => {
          // Update location data with the response data
          console.log(response.data)
          setLocationData(response.data)

          // Focus the map on the new marker with animation
          const newPosition = [response.data.lat, response.data.lng]
          mapRef.current.setView(newPosition, 20, {
            animate: true,
            duration: 1, // Animation duration in seconds
          })
        })
      })

      console.log("Form submitted", { lat, lng, header })
    } else {
      setErrors(validationErrors)
    }
  }

  //end of handlesubmit
  return (
    <>
      <div className="info-map bg-white">
        <Info locationData={locationData} />
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
              rotationAngle={parseFloat(locationData.header)}
              mapRef={mapRef}
            />
          )}
        </MapContainer>
      </div>

      {/* Form */}
      {/* <div className="flex justify-center h-screen bg-white pb-[40px]">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 max-h-[600px] mt-2">
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
              {errors.lat && <p className="text-red-500">{errors.lat}</p>}
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
              {errors.lng && <p className="text-red-500">{errors.lng}</p>}
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
              {errors.header && <p className="text-red-500">{errors.header}</p>}
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  )
}
