import { EditReportLocation, LastInsertedReportId, GetReports } from '../../Context/Report/ReportActions';


export const LocationLogic = async () => {

    const success = (position) => {
        // const lastInsertId = LastInsertedReportId();

        // EditReportLocation(lastInsertId, position.coords.latitude, position.coords.longitude, "")

        return position;
    }
    const error = (e) => {
        console.log("Unable to retrieve your location");
        const lastInsertId = LastInsertedReportId();
        EditReportLocation(lastInsertId, "", "", e.message)
    }


    if (!navigator.geolocation) {

        console.log("Geolocation is not supported by your browser");
    } else {


        navigator.geolocation.getCurrentPosition(success, error);
    }

}
export function getCurrentLocation(callback) {
    
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {

            //get last inserted report id
            const lastInsertId = LastInsertedReportId();
            console.log("getCurrentLocation:",lastInsertId)
            
            // edit report location details
            EditReportLocation(lastInsertId, position.coords.latitude, position.coords.longitude, position.coords.accuracy, 
                position.coords.altitude, position.coords.altitudeAccuracy, position.coords.heading, position.coords.speed, position.coords.timestamp,"")
            const reports = GetReports();
            callback(reports);
        },

            function (error) {
                console.log(error);
            }

        );
    }
    else {
        throw new Error("Your browser does not support geolocation.");
    }
}