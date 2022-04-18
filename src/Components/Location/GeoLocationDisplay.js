import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { BsPinMapFill } from 'react-icons/bs';
import { EditReportLocation, LastInsertedReportId } from '../../Context/Report/ReportActions';

export const GeoLocationDisplay = ({ latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed }) => {

    // const [position, setPosition] = useState({ "latitude": "", "longitude": "", "accuracy": "", "altitude": "", "altitudeAccuracy": "", "heading": "", "speed": "" });
    const [mapLink, setMapLink] = useState('');
    const [coordinates, setcoordinates] = useState('');


    useEffect(() => {

        setMapLink(`https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`);
        setcoordinates(`Latitude: ${latitude} °, Longitude: ${longitude} °`);


    }, [latitude, longitude]);



    return (
      
        <div className='flex'>
            <div>

                <p>{coordinates}</p>
            </div>

            <div>

                <a href={mapLink} className="link link-hover"><BsPinMapFill size="50" /></a>
            </div>
            {/* <a id="map-link" href={mapLink} rel="noreferrer" target="_blank">{mapLinkText}</a> */}
            <div>
            {/* <p>{status}</p> */}
            </div>

        </div>
    )
}
