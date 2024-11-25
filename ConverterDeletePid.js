const BaseConverterApiClient = require('./BaseConverterApiClient');

class ConverterDeletePid extends BaseConverterApiClient {
    async delete(pid) {
        return await this.sendRequest('DELETE', `/delete-pid/${pid}`);
    }
}

module.exports = ConverterDeletePid;