import http from 'k6/http';
import { URLS } from '../utils/urls.js';

export function getProfileRequest(token) {
    const url = URLS.profile;
    const params = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };      

    let response = http.get(url, params);

    return response;    
};