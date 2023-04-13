import axios from "axios";

class ApiClient {
    constructor(remoteHostUrl) {
        this.remoteHostUrl = remoteHostUrl
        this.token = null
        this.tokenName = "token"
    }

    // Utility Method
    async request ({ endpoint, method = "GET", data = {} }) {
        const url = this.remoteHostUrl + "/" + endpoint
        const headers = {
            "Content-Type": "application/json"
        }
        if(this.token){
            headers["Authorization"] = `Bearer ${this.token}`;
        }

        try {
            // Pass config methods to axios
            const res =  await axios({ url, method, data, headers })
            return { data: res.data, error: null }
        } 
        catch (errors) {
            const errorResponse = errors?.response?.data?.error?.message;
            return { data: null, error: errorResponse || String(errors) }
        }
    }

    setToken (token) {
        this.token = token
        localStorage.setItem(this.tokenName, this.token)
    }

    // Endpoints

    async fetchUserFromToken () {
        return await this.request({ endpoint: "user/me", method: "GET" })
    }

    async login(userInfo) {
        return await this.request( {endpoint: "user/login", method: "POST", data: userInfo} )
    }

    async register(userInfo) {
        return await this.request( {endpoint: "user/register", method: "POST", data: userInfo} )
    }

    async initDB() {
        return await this.request( {endpoint: "initDB", method: "GET", data: {}} )
    }
}

export default new ApiClient("http://localhost:3003")