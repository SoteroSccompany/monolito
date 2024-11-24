import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";
import Invoice from "../entity/invoice";
import InvoiceItem from "../entity/invoice-item";

type InvoiceFactoryProps = {
    id?: string,
    clientId: string,
    items: {
        id?: string,
        name: string,
        price: number,
        createdAt?: Date,
        updatedAt?: Date
    }[],
    createdAt?: Date,
    updatedAt?: Date
}


export default class InvoiceEntityFactory {

    static create(input: InvoiceFactoryProps): Invoice {
        try {
            const items = input.items.map(item => new InvoiceItem(item.name, item.price));
            return new Invoice(input.clientId, items, new Id(input.id), input.createdAt, input.updatedAt);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}