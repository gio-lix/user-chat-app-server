export default class ProjectError extends Error {
    _status = 0;
    _data = {};

    get statusCode() {
        return this._status;
    }
    set statusCode(code) {
        this._status = code;
    }

    get data() {
        return this._data;
    }
    set data(errorData) {
        this._data = errorData;
    }
}