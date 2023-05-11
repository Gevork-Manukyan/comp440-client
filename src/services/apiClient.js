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

    removeToken(tokenName) {
        localStorage.removeItem(tokenName)
    }

    // Endpoints

    async fetchUserFromToken () {
        return await this.request({ endpoint: "user/me", method: "GET" })
    }

    async getAllUsers () {
        return await this.request( {endpoint: "user/getAllUsers", method: "GET"} )
    }

    async login(userInfo) {
        return await this.request( {endpoint: "user/login", method: "POST", data: userInfo} )
    }

    async register(userInfo) {
        return await this.request( {endpoint: "user/register", method: "POST", data: userInfo} )
    }

    async initDB() {
        return await this.request( {endpoint: "db/initDB", method: "GET"} )
    }

    async searchItemCategory(category) {
        return await this.request( {endpoint: "db/searchItemCategory", method: "GET", data: {category}} )
    }

    async getAllReviews() {
        return await this.request( {endpoint: "review/allReviews", method: "GET"} )
    }

    async getReviewsWithDetails() {
        return await this.request( {endpoint: "review/getReviewsWithDetails", method: "GET"} )
    }

    async postReview(review) {
        return await this.request( {endpoint: "review/postReview", method: "POST", data: review} )
    }

    async getAllItems() {
        return await this.request( {endpoint: "items/allItems", method: "GET"} )
    }

    async searchItem(search) {
        return await this.request( {endpoint: `items/search?category_startswith=${search}`, method: "GET"} )
    }

    async postItem(item) {
        return await this.request( {endpoint: "items/postItem", method: "POST", data: item} )
    }

    // PART 3

    // 1
    async getExpensiveItemsByCategory() {
        return await this.request( {endpoint: `items/getExpensiveItemsByCategory`, method: "GET"} )
    }

    // 2
    async getTwoItemsDiffCategorySameDay(category1, category2) {
        return await this.request( {endpoint: `user/getTwoItemsDiffCategorySameDay/${category1}/${category2}`, method: "GET"} )
    }

    // 3
    async getExcellentGoodItemsForUser(username) {
        return await this.request( {endpoint: `user/getExcellentGoodItemsForUser/${username}`, method: "GET"} )
    } 

    // 4
    async getPopularUsers() {
        return await this.request( {endpoint: "user/getPopularUsers", method: "GET"} )
    }

    // 5
    async getSameFriends(user1, user2) {
        return await this.request( {endpoint: "user/getSameFriends", method: "POST", data: {user1, user2}} )
    }

    // 6
    async getNotExcellentUsers() {
        return await this.request( {endpoint: "user/getNotExcellentUsers", method: "GET"} )
    }

    // 7
    async getNiceReviewers() {
        return await this.request( {endpoint: "user/getNiceReviewers", method: "GET"} )
    }

    // 8
    async getMeanReviewers() {
        return await this.request( {endpoint: "user/getMeanReviewers", method: "GET"} )
    }

    // 9 
    async getGoodProducers() {
        return await this.request( {endpoint: "user/getGoodProducers", method: "GET"} )
    }

    // 10
    async getFriendUsers() {
        return await this.request( {endpoint: "user/getFriendUsers", method: "GET"} )
    }
}

export default new ApiClient("http://localhost:3003")