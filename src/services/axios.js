import axios from 'axios';

import { BASE_API_URL } from '@/config/config';

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = BASE_API_URL;
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.get['Content-Type'] = 'application/json';
axiosInstance.defaults.headers.put['Content-Type'] = 'application/json';

export default axiosInstance;
