//import uuid v4
import { v4 as uuid } from 'uuid';

export const AddReport = async (report) => {

    try {

        //assign id to report
        report.id = uuid();

        //Get reports from local storage
        const reports = GetReports();

        // //add report to array
        // reports.push(report);
        //set reports in local storage
        localStorage.setItem('reports', JSON.stringify([...reports, report]));


    } catch (e) {
        console.log("ERROR" + e);
    }

}

export const GetReport = (reportId) => {
    try {

        const reports = JSON.parse(localStorage.getItem('reports')) || [];
        const report = reports.find(report => report.id === reportId);

        return report;


    } catch (e) {
        console.log("ERROR" + e);
    }
}

export const GetReports = () => {
    try {

        const reports = JSON.parse(localStorage.getItem('reports')) || [];


        return reports;


    } catch (e) {
        console.log("ERROR" + e);
    }
}

export const CreateReportsCollection = () => {

    try {


        localStorage.setItem('reports', JSON.stringify([]));

    } catch (e) {
        console.log("ERROR" + e);
    }

}
export const LastInsertedReportId = () => {

    try {

        const reports = JSON.parse(localStorage.getItem('reports')) || [];

        return reports[reports.length - 1].id;


    } catch (e) {
        console.log("ERROR" + e);
    }

}

export const EditReportLocation = async (id, latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed, locationTimestamp, error) => {

    try {
        //Get reports from local storage

        const reports = GetReports();


        const reportWithLocation = {

            latitude: latitude,
            longitude: longitude,
            accuracy: accuracy,
            altitude: altitude,
            altitudeAccuracy: altitudeAccuracy,
            heading: heading,
            speed: speed,
            locationTimestamp: locationTimestamp,
            error: error

        }
        //find report with id
        const reportIndex = reports.findIndex(report => report.id === id);
        reports[reportIndex] = Object.assign({}, reports[reportIndex], reportWithLocation);

        //set reports in local storage
        localStorage.setItem('reports', JSON.stringify(reports));



    } catch (e) {
        console.log("ERROR" + e);
    }

}

export const EditReportImageId = async (id, imageId, error) => {

    try {
        //Get reports from local storage
        const reports = GetReports();

        const reportWithImage = {
            imageId: imageId,
            error: error

        }

        //find report with id
        const reportIndex = reports.findIndex(report => report.id === id);
        reports[reportIndex] = Object.assign({}, reports[reportIndex], reportWithImage);

        //set reports in local storage
        localStorage.setItem('reports', JSON.stringify(reports));

    } catch (e) {
        console.log("ERROR" + e);
    }

}


export const RemoveReport = (reportId) => {
    
        try {
    
            //Get reports from local storage
            const reports = GetReports();
    
            //find report with id
            const reportIndex = reports.findIndex(report => report.id === reportId);
    
            //remove report from array
            reports.splice(reportIndex, 1);
    
            //set reports in local storage
            localStorage.setItem('reports', JSON.stringify(reports));
    
        } catch (e) {
            console.log("ERROR" + e);
        }
    
}


export const EditReport = (reportId, editedReport) => {
    try {
        //Get reports from local storage
        const reports = GetReports();

        

        //find report with id
        const reportIndex = reports.findIndex(report => report.id === reportId);
        reports[reportIndex] = Object.assign({}, reports[reportIndex], editedReport);

        //set reports in local storage
        localStorage.setItem('reports', JSON.stringify(reports));

    } catch (e) {
        console.log("ERROR" + e);
    }


}