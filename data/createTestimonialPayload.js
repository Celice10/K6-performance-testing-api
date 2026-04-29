import http from 'k6/http';

export const PAYLOADS = {
    createTestimonial: {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "message": "Ndosi automation is a great bootcamp for learning API testing with k6. Highly recommended!",
        "rating": 5
    }
};