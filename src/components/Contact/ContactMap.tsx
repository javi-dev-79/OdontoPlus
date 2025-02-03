import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import '../../styles/Contact.css'

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const ContactMap: React.FC = () => {
  const location: [number, number] = [28.112556, -15.510174]

  return (
    <div className='map-container'>
      <MapContainer
        center={location}
        zoom={17}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} icon={defaultIcon}>
          <Popup>
            Odontoplus <br /> Lomo de Arucas, Av. Pedro Morales Déniz, 201,
            35411, Las Palmas
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default ContactMap
