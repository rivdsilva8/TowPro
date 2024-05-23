import { ObjectId } from "mongodb";
import * as validation from "../validation.js"; // Assume this module has validation functions
import { gps } from "../config/mongoCollections.js";
import axios from "axios";

const saveGPSData = async (lat, lng, header) => {
  // Validate the inputs
  if (!validation.isValidLatitude(lat)) {
    throw new Error("Invalid latitude");
  }
  if (!validation.isValidLongitude(lng)) {
    throw new Error("Invalid longitude");
  }
  if (!validation.isValidHeader(header)) {
    throw new Error("Invalid header");
  }

  // Prepare the data to insert
  const newGPSData = {
    lat,
    lng,
    header,
    timestamp: new Date(),
  };

  // Insert the data into the MongoDB collection
  const gpsCollection = await gps();
  const insertResult = await gpsCollection.insertOne(newGPSData);
  if (!insertResult.acknowledged) {
    throw new Error("Could not save GPS data");
  }

  return insertResult.insertedId;
};

const findLatestGPSData = async () => {
  try {
    const gpsCollection = await gps();
    const latestGPSData = await gpsCollection.findOne(
      {},
      { sort: { timestamp: -1 } }
    );
    return latestGPSData;
  } catch (error) {
    console.error("Error finding latest GPS data:", error);
    throw new Error("Error finding latest GPS data");
  }
};

const gpsData = {
  // Declare gpsData variable
  saveGPSData,
  findLatestGPSData,
};

export default gpsData; // Export gpsData as default
