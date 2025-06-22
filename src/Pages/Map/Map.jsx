import React, { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Sample districts (you can add all 64)
const districts = [
  { name: "Dhaka", lat: 23.8103, lng: 90.4125 },
  { name: "Chittagong", lat: 22.3569, lng: 91.7832 },
  { name: "Khulna", lat: 22.8456, lng: 89.5403 },
  { name: "Rajshahi", lat: 24.3745, lng: 88.6042 },
  { name: "Sylhet", lat: 24.8949, lng: 91.8687 },
  { name: "Barisal", lat: 22.701, lng: 90.3535 },
  { name: "Rangpur", lat: 25.746, lng: 89.25 },
  { name: "Mymensingh", lat: 24.7471, lng: 90.4203 },
];

const FlyToDistrict = ({ position }) => {
  const map = useMap();
  if (position) {
    map.flyTo(position, 9, {
      duration: 1.5,
    });
  }
  return null;
};

const Map = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedPosition, setSelectedPosition] = useState(null);
  const popupRefs = useRef([]);

  const handleSearch = () => {
    const result = districts.find(
      (d) => d.name.toLowerCase() === searchText.toLowerCase()
    );
    if (result) {
      setSelectedPosition([result.lat, result.lng]);

      // Open popup after flyTo
      setTimeout(() => {
        const popup = popupRefs.current[districts.indexOf(result)];
        if (popup) popup.openOn(popup._map);
      }, 1500);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="w-full">
      {/* 🔍 Search Input */}
      <div className="flex gap-2 items-center my-4 px-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Enter district name"
          className="input input-bordered w-full max-w-xs"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* 🗺️ Map */}
      <div className="h-[600px]">
        <MapContainer
          center={[23.685, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FlyToDistrict position={selectedPosition} />

          {districts.map((district, idx) => (
            <Marker
              key={idx}
              position={[district.lat, district.lng]}
              ref={(el) => (popupRefs.current[idx] = el)}
            >
              <Popup>{district.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
