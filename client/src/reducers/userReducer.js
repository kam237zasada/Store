export default (
    state = {},
    action) => {
        switch (action.type) {
            case 'USER_SIGNIN':
                return action.payload;
            case 'USER_SIGNOUT':
                return {};
            case 'GET_USER':
                return action.payload;
            default: 
                return state;
        }
    };