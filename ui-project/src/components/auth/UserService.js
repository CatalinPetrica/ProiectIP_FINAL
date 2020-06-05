import { authHeader } from './AuthHeader';
import axios from 'axios';
import {UserName} from "../../variabile";
export const userService = {
    login,
    logout

};

function login(username, password) {

    const requestOptions = {
        method: 'GET',
    };
    localStorage.setItem('username',username);

    return axios({
        method: 'post',
        url: 'http://13.58.63.43:8080/wearablehealth/users/checkCredentials',
        data: {
            username: username,
            password: password
        }
    }).then(user => {
        // login successful if there's a user in the response
        if (user) {
            // store user details and basic auth credentials in local storage
            // to keep user logged in between page refreshes
            UserName.role=user.data;
            localStorage.setItem("role", user.data);
            user.authdata = window.btoa(username + ':' + password);
            localStorage.setItem('user', JSON.stringify(user));
        }

        return user;
    })

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }
            UserName.role=response.data;
            localStorage.setItem("role", response.data);
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }



        return data;
    });
}
