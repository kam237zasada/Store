export default (
    state = [],
    action) => {
        switch (action.type) {
            case 'GET_BUYDOCS':
                return action.payload;
            default: 
                return state;
        }
    };