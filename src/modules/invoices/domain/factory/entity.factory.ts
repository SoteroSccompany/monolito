import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../value-object/address";
import Invoice from "../entity/invoice";
import InvoiceItem from "../entity/invoice-item";

type InvoiceFactoryProps = {
    id?: string,
    name: string,
    document: string,
    street: string,
    number: number,
    complement: string,
    city: string,
    state: string,
    zipCode: string
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
            const address = new Address(input.street, input.number, input.complement, input.city, input.state, input.zipCode);
            const items = input.items.map(item => new InvoiceItem(item.name, item.price));
            return new Invoice(input.name, input.document, address, items, new Id(input.id), input.createdAt, input.updatedAt);
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}