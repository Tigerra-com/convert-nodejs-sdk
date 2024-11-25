const fs = require('fs');
const axios = require('axios');
const BaseConverterApiClient = require('./BaseConverterApiClient');

class ConverterFileDownloader extends BaseConverterApiClient {
    async downloadFile(downloadUrl, outputPath) {
        const headers = {
            'Authorization': `Bearer ${this.authToken}`
        };

        const writer = fs.createWriteStream(outputPath);

        const response = await axios({
            url: downloadUrl,
            method: 'GET',
            headers: headers,
            responseType: 'stream'
        });

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        }).then(() => outputPath).catch(() => {
            throw new Error("Failed to download file.");
        });
    }
}

module.exports = ConverterFileDownloader;