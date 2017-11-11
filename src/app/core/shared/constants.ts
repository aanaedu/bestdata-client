import {environment} from '../../../environments/environment';

export const URL_CONSTANTS = {
    BASE_URL: environment.apiUrl || "NO_API_URL_FOUND",
    API_VERSION: "v1",
    STUDENTS: "students",
    USERS: "users"
};
