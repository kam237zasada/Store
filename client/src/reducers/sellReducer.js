export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_SELL':
                return action.payload;
            case 'ADD_SELL':
                return action.payload;
            default: 
                return state;
        }
    };