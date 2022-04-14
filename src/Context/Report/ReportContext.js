import { createContext, useReducer } from "react";
import { reportReducer } from "./ReportReducer";


const ReportContext = createContext();




export const ReportProvider = ({ children }) => {

    //initialize reports as an empty array, report as an empty object and loading as false
    //this is passed to the componenet 
    const initalState = {
        reports: [],
        report: {},
        loading: false,

    }


    //call useReducer and passin the reportReducer and inital state
    const [state, reportDispatch] = useReducer(reportReducer, initalState);





    return <ReportContext.Provider value={{ ...state, reportDispatch }}>
        {children}
    </ReportContext.Provider>

}



export default ReportContext;