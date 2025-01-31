import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet' // Importa Leaflet para configurar el ícono del marcador
import '../../styles/Contact.css' // Importa el archivo CSS

// Configura el ícono del marcador (necesario para React Leaflet v4.x)
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Ícono por defecto
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png', // Ícono retina
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png', // Sombra
  iconSize: [25, 41], // Tamaño del ícono
  iconAnchor: [12, 41], // Punto de anclaje del ícono
  popupAnchor: [1, -34], // Punto de anclaje del popup
  shadowSize: [41, 41] // Tamaño de la sombra
})

const ContactMap: React.FC = () => {
  // Coordenadas de la ubicación (Lomo de Arucas, Av. Pedro Morales Déniz, 201, 35411, Las Palmas)
  const location: [number, number] = [28.112556, -15.510174] // Coordenadas actualizadas

  return (
    <div className='map-container'>
      <MapContainer
        center={location} // Centra el mapa en la ubicación
        zoom={17} // Nivel de zoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' // Proveedor de mapas (OpenStreetMap)
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
