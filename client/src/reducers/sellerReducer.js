export default (
    state = {},
    action) => {
        switch (action.type) {
            case 'GET_SELLER':
                return action.payload;
            default: 
                return state;
        }
    };