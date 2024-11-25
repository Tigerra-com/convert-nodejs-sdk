const BaseConverterApiClient = require('./BaseConverterApiClient');

class ConversionStatusChecker extends BaseConverterApiClient {
    static STATUS_PENDING = 'pending';
    static STATUS_COMPLETED = 'completed';
    static STATUS_UPLOAD_ERROR = 'upload_error';
    static STATUS_PROCESS_ERROR = 'process_error';
    static STATUS_CONVERT_ERROR = 'convert_error';

    async checkStatus(pid) {
        const endpoint = `/get-status/${pid}`;
        return await this.sendRequest('GET', endpoint);
    }
}

module.exports = ConversionStatusChecker;