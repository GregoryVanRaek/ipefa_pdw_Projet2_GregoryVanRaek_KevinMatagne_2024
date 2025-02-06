import { ApiCodeResponse, ApiException } from "@common/api";

export class InvoiceCreateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.INVOICE_CREATE_ERROR, 400);
    }
}

export class InvoiceDeleteException extends ApiException {
    constructor() {
        super(ApiCodeResponse.INVOICE_DELETE_ERROR, 200);
    }
}

export class InvoiceNotFoundException extends ApiException {
    constructor() {
        super(ApiCodeResponse.INVOICE_NOT_FOUND, 200);
    }
}

export class InvoiceListException extends ApiException {
    constructor() {
        super(ApiCodeResponse.INVOICE_LIST_ERROR, 200); // Changed from SITE_NOT_FOUND for clarity.
    }
}

export class InvoiceUpdateException extends ApiException {
    constructor() {
        super(ApiCodeResponse.INVOICE_UPDATE_ERROR, 400);
    }
}
