const Converter = require('./Converter');
const ConversionStatusChecker = require('./ConversionStatusChecker');
const ConverterFileDownloader = require('./ConverterFileDownloader');
const ConverterDeletePid = require('./ConverterDeletePid');

(async () => {
    try {
        const authToken = "your-auth-token";

        // Start conversion
        console.log("Uploading file..");
        const converter = new Converter(authToken);
        const conversionResponse = await converter.audio("flac-to-wav", "/path/to/file/1.flac");
        const pid = conversionResponse.pid;
        console.log(`Conversion started. PID: ${pid}`);

        // Check status
        const statusChecker = new ConversionStatusChecker(authToken);
        let status;
        let statusResponse;
        do {
            statusResponse = await statusChecker.checkStatus(pid);
            status = statusResponse.status;
            console.log(`Status: ${status}`);

            if (status === ConversionStatusChecker.STATUS_COMPLETED) {
                break;
            } else if ([ConversionStatusChecker.STATUS_UPLOAD_ERROR, ConversionStatusChecker.STATUS_PROCESS_ERROR, ConversionStatusChecker.STATUS_CONVERT_ERROR].includes(status)) {
                throw new Error(`Error occurred: ${status}`);
            }

            await new Promise(resolve => setTimeout(resolve, 2000));
        } while (status === ConversionStatusChecker.STATUS_PENDING);

        // Download file
        const downloadUrl = statusResponse.data;
        const downloader = new ConverterFileDownloader(authToken);
        const outputPath = "/path/to/file/downloaded_file.wav";
        await downloader.downloadFile(downloadUrl, outputPath);
        console.log(`File downloaded to: ${outputPath}`);

        // Delete PID
        const deletePid = new ConverterDeletePid(authToken);
        const deleteResponse = await deletePid.delete(pid);
        if (deleteResponse.success === true) {
            console.log("PID deleted successfully.");
        } else {
            console.log(`Error deleting PID: ${deleteResponse.message}`);
        }

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();