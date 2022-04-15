import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

export const GeoLocation = () => {


    const [status, setStatus] = useState('')
    const [mapLink, setMapLink] = useState('');
    const [mapLinkText, setMapLinkText] = useState('');

    useEffect(() => {
        
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

           setStatus("");
            setMapLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
            setMapLinkText(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
        }

        function error(e) {

            setStatus(`Unable to retrieve your location.\r Reason: ${e.message}`);
        }

        if (!navigator.geolocation) {

            setStatus("Geolocation is not supported by your browser");
        } else {

            setStatus("Locating...");
            navigator.geolocation.getCurrentPosition(success, error);
        }

    }, [])


    return (
        <div>
            <p id="status">{status}</p>
            {/* <a id="map-link" href={mapLink} rel="noreferrer" target="_blank">{mapLinkText}</a> */}
            <Link className='' to={mapLink}>{mapLinkText}</Link>
        </div>
    )
}
