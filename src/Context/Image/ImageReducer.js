
export const imageReducer = (state, action) => {


    switch (action.type) {

        case 'GET_IMAGES':
            return {

                ...state,
                images: action.payload,
                loading: false
            }
        case 'GET_IMAGE':
            return {

                ...state,
                image: action.payload,
                loading: false
            }


        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }
        case 'CLEAR_':
            return {
                ...state,
                images: [],
                loading: false
            }

        default:
            return state;
    }
}