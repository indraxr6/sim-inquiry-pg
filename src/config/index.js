import axios from 'axios';

const URL = process.env.REACT_APP_API_VA //URL_DEV

const baseUrl = axios.create({
    baseURL: URL
})

export {baseUrl};