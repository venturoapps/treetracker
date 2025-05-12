import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { trees } from './data';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>🌳 Tree Tracker (Mock)</h1>
      <MapContainer center={[-23.55052, -46.633308]} zoom={13} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trees.map(tree => (
          <Marker key={tree.id} position={[tree.lat, tree.lon]}>
            <Popup>
              <strong>{tree.species}</strong><br />
              Planted: {tree.planted_at}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default App;
