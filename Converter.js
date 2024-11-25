const BaseConverterApiClient = require('./BaseConverterApiClient');

class Converter extends BaseConverterApiClient {
    static AUDIO_CONVERT_TYPES = 'aac-to-aiff, aac-to-flac, aac-to-mp3, aac-to-wav, aiff-to-aac, aiff-to-flac, aiff-to-mp3, aiff-to-wav, flac-to-aac, flac-to-aiff, flac-to-mp3, flac-to-wav, mp3-to-aac, mp3-to-aiff, mp3-to-flac, mp3-to-wav, wav-to-aac, wav-to-aiff, wav-to-flac, wav-to-mp3';
    static VIDEO_CONVERT_TYPES = 'mp4-to-webm, avi-to-webm, flv-to-webm, mkv-to-webm, mpeg-to-webm, wmv-to-webm, webm-to-mp4, avi-to-mp4, flv-to-mp4, mkv-to-mp4, mpeg-to-mp4, wmv-to-mp4, webm-to-avi, mp4-to-avi, flv-to-avi, mkv-to-avi, mpeg-to-avi, wmv-to-avi, webm-to-mpeg, avi-to-mpeg, mkv-to-mpeg, flv-to-mpeg, webm-to-flv, avi-to-flv, mkv-to-flv, mpeg-to-flv, wmv-to-flv';
    static IMAGE_CONVERT_TYPES = 'heic-to-jpg, pdf-to-jpg, psd-to-jpg, eps-to-jpg, webp-to-jpg, tiff-to-jpg, heic-to-png, psd-to-png, eps-to-png, webp-to-png, svg-to-png, tiff-to-png, jpg-to-png, jpg-to-webp, jpg-to-tiff, jpg-to-gif, png-to-gif, png-to-jpg, png-to-webp, png-to-svg, png-to-tiff, png-to-eps';
    static DOCUMENT_CONVERT_TYPES = 'word-to-pdf, ppt-to-pdf, excel-to-pdf, odt-to-pdf, ods-to-pdf, odp-to-pdf, html-to-pdf, rtf-to-pdf, csv-to-pdf, pdf-to-html, pdf-to-odg, pdf-to-otg, pdf-to-fodg, pdf-to-docx, pdf-to-txt, html-to-odt, pdf-to-xlsx, txt-to-rtf, text-to-html, txt-to-docx, txt-to-doc, txt-to-odt, txt-to-xml, json-to-xml, xml-to-json, csv-to-json, rtf-to-txt, rtf-to-docx, rtf-to-html, rtf-to-doc, rtf-to-odt, rtf-to-ott';
    static FONT_CONVERT_TYPES = 'ttf-to-otf, ttf-to-eot, ttf-to-woff, ttf-to-woff2, woff-to-otf, woff-to-eot, woff-to-ttf, woff-to-woff2, woff2-to-otf, woff2-to-eot, woff2-to-ttf, woff2-to-woff, eot-to-otf, eot-to-ttf, eot-to-woff, eot-to-woff2, otf-to-ttf, otf-to-eot, otf-to-woff, otf-to-woff2';
    static AUDIO_EFFECTS = 'downmix-track, noice-reduce-track, audio-3d, volume, bass-booster, equalizer, reverse-audio, tempo, stereo-panner, auto-panner, vocal-remover, pitch-shifter, reverb, mono-to-stereo, stereo-to-mono, drunken-loudspeaker, low-frequency-noise';

    async audio(conversionType, filePath) {
        if (!Converter.AUDIO_CONVERT_TYPES.split(', ').includes(conversionType)) {
            throw new Error(`Invalid conversion type: ${conversionType}. Supported types: ${Converter.AUDIO_CONVERT_TYPES}`);
        }

        const endpoint = `/do-convert/${conversionType}`;
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async video(conversionType, filePath) {
        if (!Converter.VIDEO_CONVERT_TYPES.split(', ').includes(conversionType)) {
            throw new Error(`Invalid conversion type: ${conversionType}. Supported types: ${Converter.VIDEO_CONVERT_TYPES}`);
        }

        const endpoint = `/video/${conversionType}`;
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async image(conversionType, filePath) {
        if (!Converter.IMAGE_CONVERT_TYPES.split(', ').includes(conversionType)) {
            throw new Error(`Invalid conversion type: ${conversionType}. Supported types: ${Converter.IMAGE_CONVERT_TYPES}`);
        }

        const endpoint = `/do-convert/${conversionType}`;
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async document(conversionType, filePath) {
        if (!Converter.DOCUMENT_CONVERT_TYPES.split(', ').includes(conversionType)) {
            throw new Error(`Invalid conversion type: ${conversionType}. Supported types: ${Converter.DOCUMENT_CONVERT_TYPES}`);
        }

        const endpoint = `/documents/${conversionType}`;
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async font(conversionType, filePath) {
        if (!Converter.FONT_CONVERT_TYPES.split(', ').includes(conversionType)) {
            throw new Error(`Invalid conversion type: ${conversionType}. Supported types: ${Converter.FONT_CONVERT_TYPES}`);
        }

        const endpoint = `/fonts/${conversionType}`;
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async pdf_compress(filePath) {
        const endpoint = "/documents/pdf-compress";
        return await this.sendRequest('POST', endpoint, {}, filePath);
    }

    async audio_effect(effectType, filePath, params = {}) {
        if (!Converter.AUDIO_EFFECTS.split(', ').includes(effectType)) {
            throw new Error(`Invalid audio effect type: ${effectType}. Supported types: ${Converter.AUDIO_EFFECTS}`);
        }

        const endpoint = `/${effectType}`;
        return await this.sendRequest('POST', endpoint, params, filePath);
    }
}

module.exports = Converter;