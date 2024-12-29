import {ApiCodeResponse, ApiException} from "@common/api";

export class ContractCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CONTRACT_CREATE_ERROR, 400);
    }
}

export class ContractDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CONTRACT_DELETE_ERROR, 200);
    }
}

export class ContractNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CONTRACT_NOT_FOUND, 200);
    }
}

export class ContractListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CONTRACT_NOT_FOUND, 200);
    }
}

export class ContractUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.CONTRACT_UPDATE_ERROR, 400);
    }
}