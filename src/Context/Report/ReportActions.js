

export const AddReport = async (report) => {

    try {
        localStorage.setItem('reports', JSON.stringify(report));

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

export const CreateReportsCollection =  () => {

    try {


        localStorage.setItem('reports', JSON.stringify([]));

    } catch (e) {
        console.log("ERROR" + e);
    }

}