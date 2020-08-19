const axios = require('axios');
const API_BASE_URL = process.env.NODE_ENV === 'production' ?
"https://will-be-added-later.com/api" : "http://localhost:3000/api"

const api = function (action_type, payload, base_url_arg) {
    let headers = { auth: (process.client) ? localStorage.getItem('token') : null }
    let base_url = base_url_arg ? base_url_arg : API_BASE_URL
    return axios.post(`${base_url}/${action_type}`, payload, { headers })
};

export default api;