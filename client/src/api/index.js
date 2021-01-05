const axios = require('axios');

export default axios.create({
    baseURL:'http://localhost:3000',
    headers: {"access-control-allow-origin": "*"}
});