const initialState = {
    payment_method: null,
    inquiry_data: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PAYMENT':
            return {
                ...state,
                payment_method: action.payload.item
            }
        case 'FIND_INQUIRY':
            return {
                ...state,
                inquiry_data: action.payload.item
            }
        case 'CANCEL_INQUIRY':
            return {
                ...state,
                inquiry_data: action.payload.item
            }
        default:
            return state
    }
}

export default reducer;