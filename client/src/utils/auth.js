import decode from 'jwt-decode';

class AuthService {

    getProfile() {

        return decode(this.getToken());
    }

    loggedIn() {

        const token = this.getToken();

        // If there is a token and it's not expired, return `true`
        return token && !this.isTokenExpired(token) ? true : false;
    }

    isTokenExpired(token) {

        // Decode the token to get its expiration time that was set by the server
        const decoded = decode(token);

        // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
        if (decoded.exp < Date.now() / 1000) {

            localStorage.removeItem('id_token');
            return true;
        }

        // If token hasn't passed its expiration time, return `false`
        return false;
    }

    // Here, we get the token and return it to the caller.
    getToken() {

        return localStorage.getItem('id_token');
    }

    // Here, we log the user into the application
    login(idToken) {

        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    // Here, we log the user out of the application
    logout() {

        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}

export default new AuthService();
