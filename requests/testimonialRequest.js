import http from 'k6/http';
import { URLS } from '../utils/urls.js';

export function createTestimonialPayload(token, payload) {
    
    const url = URLS.Testimonials;

    const body = JSON.stringify(payload);
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    let response = http.post(url, body, params);

    return response;
};