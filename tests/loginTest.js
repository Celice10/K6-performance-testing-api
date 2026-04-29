import { loginRequest } from '../requests/apiRequestBuilder.js';
import { PAYLOADS } from '../data/payloads.js';
import {check} from 'k6';

export default function loginTest() {
    const response = loginRequest(PAYLOADS.login)
    check(response, {
        'status is 200': (r) => r.status === 200,
    });
}


