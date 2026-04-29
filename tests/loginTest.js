import { loginRequest} from '../requests/apiRequestBuilder.js';
import { getProfileRequest } from '../requests/profileRequest.js';
import { PAYLOADS } from '../data/payloads.js';
import { createTestimonialPayload } from '../requests/testimonialRequest.js';
import { updateTestimonialRequest } from '../requests/updateTestimonialRequest.js';
import { deleteTestimonialRequest } from '../requests/deleteTestimonialRequest.js';
import { Test_Config } from '../utils/constants.js';
import { check, sleep } from 'k6';

export const options = {
    vus: Test_Config.vus,
    duration: Test_Config.duration,
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(95)<1000'],
    },
};

export default function () {

    const response = loginRequest(PAYLOADS.login)

    console.log(`status=${response.status}`);
    console.log(response.body);

    check(response, {
        'status is 200': (r) => r.status === 200,
    });


    //extract token from the response
    const token = response.json().data.token;
    check(token, {
        'token is present': (t) => t !== undefined && t !== null && t !== '',
    });

    //get profile information using the token
    const profileResponse = getProfileRequest(token);
    check(profileResponse, {
        'profile status is 200': (r) => r.status === 200,
    });

    const createResponse = createTestimonialPayload(token, PAYLOADS.createTestimonialPayload);

    check(createResponse, {
        'testimonial is created': (r) => r.status === 201,
    });

    const testimonialId = createResponse.json().data.Id;

    console.log(`testimonialId=${testimonialId}`);

    //Update testimonial
    const updateResponse = updateTestimonialRequest(token, testimonialId, PAYLOADS.updateTestimonialRequest

    );

    check(updateResponse, {
        'testimonial is updated': (r) => r.status === 200,
    }); 

    //Delete testimonial
    const deleteResponse = deleteTestimonialRequest(token, testimonialId);

    check(deleteResponse, {
        'testimonial is deleted': (r) => r.status === 200,
    });     
    console.log('Deleted testimonial with ID:', testimonialId);

    sleep(Test_Config.sleeptime);
}


