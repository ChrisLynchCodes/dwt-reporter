import { createContext, useReducer } from "react";
import { imageReducer } from "./ImageReducer";


const ImageContext = createContext();



//proivder wraps the app and provides the state and dispatch to the app

export const ImageProvider = ({ children }) => {

    //initialize images as an empty array, image as an empty object and loading as false
    //this is passed to the componenet 
    const initalState = {
        images: [],
        image: "",
        loading: false,

    }


    //call useReducer and passin the imageReducer and inital state
    const [state, imageDispatch] = useReducer(imageReducer, initalState);





    return <ImageContext.Provider value={{ ...state, imageDispatch }}>
        {children}
    </ImageContext.Provider>

}



export default ImageContext;