export default (
    state = {},
    action) => {
        switch (action.type) {
            case 'ADD_PRODUCT':
                return action.payload;
            case 'FIND_BY_SERIAL':
                return action.payload;
            default: 
                return state;
        }
    };