import { loginRequest, getProfileRequest } from '../requests/apiRequestBuilder.js';
import { PAYLOADS } from '../data/payloads.js';
import {check} from 'k6';

export default function () {

    const response = loginRequest(PAYLOADS.login)
    check(response, {
        'status is 200': (r) => r.status === 200,
    });


    //extract token from the response
    const token = response.json().token;
    check(token, {
        'token is present': (t) => t !== undefined && t !== null && t !== '',
    });

    //get profile information using the token
    const profileResponse = getProfileRequest(token);
    check(profileResponse, {
        'profile status is 200': (r) => r.status === 200,
    });
}


