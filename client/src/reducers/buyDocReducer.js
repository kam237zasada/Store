export default (
    state = {},
    action) => {
        switch (action.type) {
            case 'GET_BUYDOC':
                return action.payload;
            default: 
                return state;
        }
    };