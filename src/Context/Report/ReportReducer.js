
export const reportReducer = (state, action) => {


    switch (action.type) {

        case 'GET_REPORTS':
            return {

                ...state,
                reports: action.payload,
                loading: false
            }
        case 'GET_REPORT':
            return {

                ...state,
                report: action.payload,
                loading: false
            }


        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CLEAR_REPORTS':
            return {
                ...state,
                reports: [],
                report: {},
                loading: false
            }

        default:
            return state;
    }
}