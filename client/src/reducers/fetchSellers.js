export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_SELLERS':
                return action.payload;
            default: 
                return state;
        }
    };