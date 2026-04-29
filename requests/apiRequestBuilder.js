import http from 'k6/http';
import { URLS } from '../utils/urls.js';

export function loginRequest(payload) {
    const url = URLS.login;

    const body = JSON.stringify(payload);

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let response = http.post(url, body, params);

    return response;

};

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