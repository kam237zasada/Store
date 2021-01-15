export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_BRANDS':
                return action.payload;
            default: 
                return state;
        }
    };