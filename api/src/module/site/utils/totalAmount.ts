import {Invoice} from '../model';

export const TotalAmountForInvoice=(invoice:Invoice):number=> {
    let total=0;
    for (const invoiceLine of invoice.invoiceLines) {
        total+=invoiceLine.quantity*(1+(invoiceLine.vatRate/100))*invoiceLine.price;
    }
    return total;
}