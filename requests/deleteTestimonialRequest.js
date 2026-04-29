import http from 'k6/http';
import { URLS } from '../utils/urls.js';

export function deleteTestimonialRequest(token, testimonialId) {
    const url = `${URLS.delete_testimonial.replace('{id}', testimonialId)}`;
    const params = {
        headers: {
            
            'Authorization': `Bearer ${token}`,
        },
    };                  

    let response = http.del(url, null, params);

    return response;
}