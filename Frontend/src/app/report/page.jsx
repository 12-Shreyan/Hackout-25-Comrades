"use client";

import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
// import { MapPin } from "lucide-react";

import { MapPin, Camera, Scissors, Droplet, Waves } from "lucide-react";

export default function ReportForm() {
  const [formData, setFormData] = useState({
    reportType: "",
    description: "",
    photos: [],
    latitude: "",
    longitude: "",
    severity: "",
    date: new Date().toISOString().slice(0, 16),
    notes: "",
    region: "",
    manualRegion: "",
  });

  const [marker, setMarker] = useState([21.0, 72.0]); // default map center
  const [points, setPoints] = useState(0); // example badge points

  // Map click and drag handler
  const customIcon = L.divIcon({
    html: `<div class="bg-green-600 text-white p-1 rounded-full shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s-6-6-6-10a6 6 0 0112 0c0 4-6 10-6 10z" />
            </svg>
          </div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        setFormData((prev) => ({
          ...prev,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
        }));
      },
    });

    return (
      <Marker
        position={marker}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const { lat, lng } = e.target.getLatLng();
            setMarker([lat, lng]);
            setFormData((prev) => ({
              ...prev,
              latitude: lat.toFixed(6),
              longitude: lng.toFixed(6),
            }));
          },
        }}
      />
    );
  }

  // Current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarker([latitude, longitude]);
          setFormData((prev) => ({
            ...prev,
            latitude: latitude.toFixed(6),
            longitude: longitude.toFixed(6),
          }));
        },
        () => alert("Unable to fetch location")
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, photos: [...e.target.files] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "photos") {
        formData.photos.forEach((file) => data.append("photos", file));
      } else {
        data.append(key, formData[key]);
      }
    });

    // Example: update points on submit
    setPoints(points + 10);

    const res = await fetch("/api/report", { method: "POST", body: data });
    if (res.ok) alert("Report submitted successfully!");
    else alert("Error submitting report");
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-green-800 mb-6">
        🌿 Submit a Mangrove Report
      </h2>

      <form
        className="bg-green-50 p-8 rounded-2xl shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Report Type */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Report Type *
          </label>
          <select
            name="reportType"
            value={formData.reportType}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select type</option>
            <option value="illegal_cutting">Illegal Cutting ✂️</option>
            <option value="pollution">Pollution / Dumping 💧</option>
            <option value="erosion">Coastal Erosion 🌊</option>
            <option value="wildlife">Wildlife Disturbance 🦜</option>
            <option value="other">Other</option>
          </select>
          <div className="flex mt-2 gap-2 text-green-700">
            <Scissors className="w-5 h-5" />
            <Droplet className="w-5 h-5" />
            <Waves className="w-5 h-5" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Describe the incident"
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Upload Photos *
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-600 file:bg-green-600 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none hover:file:bg-green-700"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.photos.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-20 w-20 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        {/* Location & Region */}
        <div>
          <label className="block text-sm font-semibold mb-1">Location *</label>
          <div className="flex gap-4 mb-2">
            <input
              type="text"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              required
              className="w-1/2 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              required
              className="w-1/2 rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            type="button"
            onClick={getCurrentLocation}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition mb-2"
          >
            <MapPin className="w-5 h-5" /> Use Current Location
          </button>

          <div className="mb-2">
            <label className="block text-sm font-semibold mb-1">Region *</label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select region</option>
              <option value="gujarat_coast">Gujarat Coast</option>
              <option value="maharashtra_coast">Maharashtra Coast</option>
              <option value="kerala_coast">Kerala Coast</option>
              <option value="sundarbans">Sundarbans</option>
              <option value="odisha_coast">Odisha Coast</option>
              <option value="andaman">Andaman & Nicobar Islands</option>
              <option value="other">Other</option>
            </select>

            {formData.region === "other" && (
              <input
                type="text"
                name="manualRegion"
                value={formData.manualRegion || ""}
                onChange={handleChange}
                placeholder="Enter custom region or coordinates"
                className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
              />
            )}
          </div>
          <MapContainer
            center={marker}
            zoom={10}
            scrollWheelZoom={true}
            className="h-64 w-full rounded-lg border"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <Marker
              position={marker}
              icon={customIcon}
              draggable={true}
              eventHandlers={{
                dragend: (e) => {
                  const { lat, lng } = e.target.getLatLng();
                  setMarker([lat, lng]);
                  setFormData((prev) => ({
                    ...prev,
                    latitude: lat.toFixed(6),
                    longitude: lng.toFixed(6),
                  }));
                },
              }}
            />

            {/* Map click to update marker */}
            {/* <MapEvents /> */}
          </MapContainer>

          {/* <LocationMarker />
          </MapContainer> */}
        </div>

        {/* Threat Severity */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Threat Severity *
          </label>
          <select
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
          >
            <option value="">Select severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="text-xs text-gray-500 mt-1 block">
            Low: Minor | Medium: Noticeable | High: Urgent
          </span>
        </div>

        {/* Date & Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">
              Date & Time of Incident *
            </label>
            <input
              type="datetime-local"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={2}
              placeholder="Optional"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Badge / Points Info */}
        <div className="p-4 rounded-lg bg-green-100 flex items-center gap-2">
          <Camera className="w-6 h-6 text-green-700" />
          <span>
            Submitting this report earns <strong>10 points</strong> toward your
            next badge! Current points: <strong>{points}</strong>
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Submit Report
        </button>
      </form>
    </section>
  );
}
