import http from 'k6/http';
import { URLS } from '../utils/urls.js';

export function updateTestimonialRequest(token, testimonialId, payload) {
    const url = `${URLS.Testimonials}${testimonialId}/`;
    const body = JSON.stringify(payload);
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };  

    let response = http.put(url, body, params);

    return response;
}