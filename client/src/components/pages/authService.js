import decode from 'jwt-decode';

class AuthService {
    constructor(domain='http://localhost:3001') {
        this.domain = domain;
        this.url = 'admin/signin'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(email, password) {
        return this.fetch(this.url, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.token) 
            return Promise.resolve(res);
        })
    }

    isLoggedIn() {
        const token = this.getToken();
        return this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if(decoded.exp < Date.now()) {
                return true
            } else {
                return false
            }
        } catch(err) {
            return false;
        }
    }

    setToken(tokenId) {
        localStorage.setItem('hbo_tv', tokenId)
    }

    getToken() {
        return localStorage.getItem('hbo_tv')
    }

    logout() {
        localStorage.removeItem('hbo_tv')
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(this.isLoggedIn()) {
            headers['Authorization'] = 'Bearer' + this.getToken()

        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(res => res.json())
    }

    _checkStatus(res) {
        if(res.status >= 200 && res.status < 300) {
            return res
        } else {
            const error = new Error(res.statusText)
            error.res = res
            throw error
        }
    }
};

export default AuthService;
