import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { trees } from './data';
import QRCode from 'qrcode.react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {trees.map(tree => {
          const treeUrl = `https://tree-tracker.netlify.app/trees/${tree.slug}`;
          return (
            <Marker key={tree.id} position={[tree.lat, tree.lon]}>
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <strong>{tree.species}</strong><br />
                  Planted: {tree.planted_at}<br />
                  <QRCode value={treeUrl} size={100} />
                  <div style={{ fontSize: "10px", marginTop: "4px" }}>{tree.slug}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default App;
