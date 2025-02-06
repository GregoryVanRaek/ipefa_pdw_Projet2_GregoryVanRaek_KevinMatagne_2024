import {ApiCodeResponse, ApiException} from "@common/api";

export class SiteCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SITE_CREATE_ERROR, 400);
    }
}

export class SiteDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SITE_DELETE_ERROR, 200);
    }
}

export class SiteNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SITE_NOT_FOUND, 200);
    }
}

export class SiteListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SITE_NOT_FOUND, 200);
    }
}

export class SiteUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.SITE_UPDATE_ERROR, 400);
    }
}