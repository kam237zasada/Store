export default (
    state = {},
    action) => {
        switch (action.type) {
            case 'ADD_BRAND':
                return action.payload;
            case 'ADD_MODEL':
                return action.payload;
            default: 
                return state;
        }
    };