import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import LeafLet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapLocation.css';

delete LeafLet.Icon.Default.prototype._getIconUrl;
LeafLet.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapLocation() {
    const position = [33.4490056, -84.3047935];

    const orangeMarkerStyle = L.divIcon({
        className: 'custom-orange-marker',
        html: '<div class="pin"></div><div class="pin-shadow"></div>',
        iconSize: [25, 41], // similar size to the default marker
        iconAnchor: [14, 48], // center the marker's point
        popupAnchor: [0, -41], // make the popup appear above the marker
    });
    

    const customMarker = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41], // size of the icon
        iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
        popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
        shadowSize: [41, 41], // size of the shadow
    });

    return (
        <div className="h-screen mx-4 md:mx-16 lg:mx-36 mt-12 md:mt-24 border-4 rounded-lg shadow-md border-primary">
            <MapContainer
                center={position}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={orangeMarkerStyle} title={'Cutie Pie Transport LLC'}>
                    <Popup>Cutie Pie Transport LLC, 270 Gulfport Dr, Hampton, GA </Popup>
                </Marker>
            </MapContainer>
        </div>
    );    
}