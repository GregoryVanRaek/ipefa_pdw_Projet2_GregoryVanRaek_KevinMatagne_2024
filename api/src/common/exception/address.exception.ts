import {ApiCodeResponse, ApiException} from "@common/api";

export class AddressCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.ADDRESS_CREATE_ERROR, 400);
    }
}

export class AddressDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.ADDRESS_DELETE_ERROR, 200);
    }
}

export class AddressNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.ADDRESS_NOT_FOUND, 200);
    }
}

export class AddressListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.ADDRESS_NOT_FOUND, 200);
    }
}

export class AddressUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.ADDRESS_UPDATE_ERROR, 400);
    }
}