import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api-search-bus.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default instance