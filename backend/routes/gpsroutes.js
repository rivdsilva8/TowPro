import express from "express"
import gpsData from "../data/gps.js"
const gpsroutes = express.Router()

let latestLocation = { lat: null, lon: null, heading: null }

gpsroutes.post("/", async (req, res) => {
  try {
    const { lat, lon, heading } = req.body
    const latFloat = parseFloat(lat)
    const lonFloat = parseFloat(lon)
    const headingFloat = parseFloat(heading)
    latestLocation = { lat: latFloat, lon: lonFloat, heading: headingFloat }
    console.log("GPS data received")
    console.log("lat:", latFloat)
    console.log("lon:", lonFloat)
    console.log("heading:", headingFloat)

    //mongo insertion
    let insertion = await gpsData.saveGPSData(latFloat, lonFloat, headingFloat)
    console.log("GPS data entered into Mongo")
    res.status(200).send("GPS data entered")
  } catch (e) {
    console.log(e)
    console.error("Error posting GPS data:", e.message)
    res.status(400).send({ error: e.message })
  }
})

gpsroutes.get("/", async (req, res) => {
  try {
    // If latestLocation is null, retrieve the latest GPS data from the database
    if (latestLocation.lat == null) {
      console.log("inside null latest location if block")
      latestLocation = await gpsData.findLatestGPSData()
    }
    res.status(200).json(latestLocation)
  } catch (error) {
    console.error("Error fetching latest GPS data:", error)
    res.status(500).json({ error: "Internal server error" })
  }
})

export default gpsroutes
