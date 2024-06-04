import { useState, useRef, useEffect } from "react"
import L from "leaflet"
import "./Map.css"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import { MapContainer, TileLayer } from "react-leaflet"
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
      marker.remove()
    }

    const newMarker = L.marker(position, {
      icon,
      rotationAngle,
      rotationOrigin: "center center",
    }).addTo(mapRef.current)

    setMarker(newMarker)

    return () => {
      if (marker) {
        marker.remove()
      }
    }
  }, [position, rotationAngle])

  return null
}

export default RotatedMarker

export const Map = () => {
  const [locationData, setLocationData] = useState({
    lat: 0,
    lon: 0,
    heading: 0,
  })
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [heading, setHeading] = useState(0)
  const [errors, setErrors] = useState({})
  const [rAngle, setRAngle] = useState(0)
  const mapRef = useRef()

  const lightModeUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/gpsstatus")

        const newLocationData = response.data
        console.log("Response from server:", newLocationData)
        console.log("Current location data:", locationData)

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

    const updateLocationData = (newLocationData) => {
      setLocationData(newLocationData)
      setRAngle(newLocationData.heading)
      console.log("locationData after setting:", newLocationData)
      console.log(rAngle)
      const newPosition = [newLocationData.lat, newLocationData.lon]
      mapRef.current.setView(newPosition, 20, {
        animate: true,
        duration: 1,
      })

      const newRotationAngle = parseFloat(newLocationData.heading) || 0
      setRAngle(newRotationAngle)
      console.log("rotationAngle = ", newRotationAngle)
    }

    fetchLocationData()

    const interval = setInterval(fetchLocationData, 1000)

    return () => clearInterval(interval)
  }, [locationData])

  const validateForm = () => {
    const errors = {}
    const latNum = parseFloat(lat)
    const lonNum = parseFloat(lon)
    const headingNum = parseFloat(heading)

    if (isNaN(latNum) || latNum < -90 || latNum > 90) {
      errors.lat = "Latitude must be a number between -90 and 90."
    }

    if (isNaN(lonNum) || lonNum <= -180 || lonNum > 180) {
      errors.lon = "Longitude must be a number between -180 and 180."
    }

    if (isNaN(headingNum) || headingNum < 0 || headingNum > 360) {
      errors.heading = "Heading must be a number between 0 and 360."
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (Object.keys(validationErrors).length === 0) {
      setErrors({})
      try {
        await axios.post("http://localhost:3001/gpsstatus", { lat, lon, heading })
        console.log("Posted successfully")
        const response = await axios.get("http://localhost:3001/gpsstatus")
        console.log(response.data)
        setLocationData(response.data)

        const newPosition = [response.data.lat, response.data.lon]
        mapRef.current.setView(newPosition, 20, {
          animate: true,
          duration: 1,
        })
        console.log("Form submitted", { lat, lon, heading })
      } catch (error) {
        console.error("Error posting location data:", error)
      }
    } else {
      setErrors(validationErrors)
    }
  }

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
          {locationData && (
            <RotatedMarker
              position={[locationData.lat, locationData.lon]}
              rotationAngle={parseFloat(locationData.heading)}
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
                name="lon"
                type="number"
                placeholder="Longitude"
                className="input input-bordered"
                required
                value={lon}
                onChange={(e) => setLon(e.target.value)}
              />
              {errors.lon && <p className="text-red-500">{errors.lon}</p>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Heading</span>
              </label>
              <input
                name="heading"
                type="number"
                placeholder="Heading"
                className="input input-bordered"
                required
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              {errors.heading && <p className="text-red-500">{errors.heading}</p>}
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
