import React, { useState } from "react";
import axios from "axios";

export const GPSForm = ({ onMarkerUpdate }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [header, setHeader] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/gpsstatus", { lat, lng, header })
      .then((response) => {
        // Call the onMarkerUpdate function passed as a prop to notify the parent component (Map) about the marker update
        onMarkerUpdate();
      })
      .catch((error) => {
        console.error("Error updating GPS status:", error);
      });
  };

  return (
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
  );
};
