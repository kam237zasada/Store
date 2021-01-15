export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_SELLS':
                return action.payload;
            default: 
                return state;
        }
    };