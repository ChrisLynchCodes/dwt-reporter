import React from 'react'
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { Icon } from "leaflet";


export const Map = ({latitude, longitude, reportTitle}) => {
    return (
        
            <div>
            <MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[latitude, longitude]}>
                    <Popup>
                        Report: {reportTitle}
                    </Popup>
                </Marker>
            </MapContainer>
            </div>
           

       

    )
}
