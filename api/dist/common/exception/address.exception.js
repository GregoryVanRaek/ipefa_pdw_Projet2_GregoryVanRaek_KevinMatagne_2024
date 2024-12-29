"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressUpdateException = exports.AddressListException = exports.AddressNotFoundException = exports.AddressDeleteException = exports.AddressCreateException = void 0;
const api_1 = require("../api");
class AddressCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.ADDRESS_CREATE_ERROR, 400);
    }
}
exports.AddressCreateException = AddressCreateException;
class AddressDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.ADDRESS_DELETE_ERROR, 200);
    }
}
exports.AddressDeleteException = AddressDeleteException;
class AddressNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.ADDRESS_NOT_FOUND, 200);
    }
}
exports.AddressNotFoundException = AddressNotFoundException;
class AddressListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.ADDRESS_NOT_FOUND, 200);
    }
}
exports.AddressListException = AddressListException;
class AddressUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.ADDRESS_UPDATE_ERROR, 400);
    }
}
exports.AddressUpdateException = AddressUpdateException;
//# sourceMappingURL=address.exception.js.map