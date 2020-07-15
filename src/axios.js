import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api-search-bus.herokuapp.com/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

export default instance