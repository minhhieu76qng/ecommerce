import axios from 'axios';

const baseURL = process.env.REAECT_APP_BASE_URL || 'http://localhost:5000';
axios.defaults.baseURL = baseURL;