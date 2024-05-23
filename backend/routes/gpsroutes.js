import express from "express";
import gpsData from "../data/gps.js";
const gpsroutes = express.Router();

let latestLocation = { lat: null, lng: null, header: null };

gpsroutes.post("/", async (req, res) => {
  try {
    const { lat, lng, header } = req.body;
    const latFloat = parseFloat(lat);
    const lngFloat = parseFloat(lng);
    const headerFloat = parseFloat(header);
    latestLocation = { lat: latFloat, lng: lngFloat, header: headerFloat };
    console.log("GPS data received");
    console.log("lat:", latFloat);
    console.log("lng:", lngFloat);
    console.log("header:", headerFloat);

    //mongo insertion
    let insertion = await gpsData.saveGPSData(latFloat, lngFloat, headerFloat);
    console.log("GPS data entered into Mongo");
    res.status(200).send("GPS data entered");
  } catch (e) {
    console.log(e);
  }
});

gpsroutes.get("/", async (req, res) => {
  try {
    // If latestLocation is null, retrieve the latest GPS data from the database
    if (latestLocation.lat == null) {
      console.log("inside null latest location function");
      console.log;
      latestLocation = await gpsData.findLatestGPSData();
    }
    res.status(200).json(latestLocation);
  } catch (error) {
    console.error("Error fetching latest GPS data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default gpsroutes;
