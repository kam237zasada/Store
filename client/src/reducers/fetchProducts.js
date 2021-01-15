export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_PRODUCTS':
                return action.payload;
            case 'FIND_SERIALS':
                return action.payload;
            default: 
                return state;
        }
    };