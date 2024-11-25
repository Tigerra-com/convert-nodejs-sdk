const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

class BaseConverterApiClient {
    static API_URL = "https://convert.tigerra.com";

    constructor(authToken) {
        this.authToken = authToken;
    }

    async sendRequest(method, endpoint, params = {}, filePath = null) {
        const url = `${BaseConverterApiClient.API_URL}${endpoint}`;

        const headers = {
            'Authorization': `Bearer ${this.authToken}`
        };

        let data = params;

        if (method === 'POST' && filePath) {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            const form = new FormData();
            form.append('file', fs.createReadStream(filePath));

            for (const key in params) {
                form.append(key, params[key]);
            }

            data = form;
            headers['Content-Type'] = `multipart/form-data; boundary=${form._boundary}`;
        }

        try {
            const response = await axios({
                method: method,
                url: url,
                headers: headers,
                data: data,
                timeout: 300000 // Set timeout to 300 seconds
            });

            return response.data;
        } catch (error) {
            if (error.response) {
                throw new Error(`HTTP Error: ${error.response.status} - Response: ${error.response.data}`);
            } else if (error.request) {
                throw new Error(`No response received: ${error.message}`);
            } else {
                throw new Error(`Request error: ${error.message}`);
            }
        }
    }
}

module.exports = BaseConverterApiClient;