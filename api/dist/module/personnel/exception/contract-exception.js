"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractUpdateException = exports.ContractListException = exports.ContractNotFoundException = exports.ContractDeleteException = exports.ContractCreateException = void 0;
const api_1 = require("../../../common/api");
class ContractCreateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONTRACT_CREATE_ERROR, 400);
    }
}
exports.ContractCreateException = ContractCreateException;
class ContractDeleteException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONTRACT_DELETE_ERROR, 200);
    }
}
exports.ContractDeleteException = ContractDeleteException;
class ContractNotFoundException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONTRACT_NOT_FOUND, 200);
    }
}
exports.ContractNotFoundException = ContractNotFoundException;
class ContractListException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONTRACT_NOT_FOUND, 200);
    }
}
exports.ContractListException = ContractListException;
class ContractUpdateException extends api_1.ApiException {
    constructor() {
        super(api_1.ApiCodeResponse.CONTRACT_UPDATE_ERROR, 400);
    }
}
exports.ContractUpdateException = ContractUpdateException;
//# sourceMappingURL=contract-exception.js.map