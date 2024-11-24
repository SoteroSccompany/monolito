import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";

import InvoiceItem from "./invoice-item";



export default class Invoice extends BaseEntity implements AggregateRoot {

    private _clientId: string;
    private _items: InvoiceItem[];

    constructor(clientId: string, items: InvoiceItem[], id?: Id
        , createdAt?: Date, updatedAt?: Date
    ) {
        super(id, createdAt, updatedAt);
        this._clientId = clientId;
        this._items = items;
        this.validate();
    }

    validate(): void {
        if (!this._clientId) {
            throw new Error('Client is required');
        }
        if (!this._items) {
            throw new Error('Items is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items is required');
        }
    }

    get clientId(): string {
        return this._clientId;
    }

    get items(): InvoiceItem[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0);
    }

    addItem(item: InvoiceItem): void {
        this._items.push(item);
        this.validate();
    }

    removeItem(item: InvoiceItem): void {
        this._items = this._items.filter(i => i.id !== item.id);
        this.validate();
    }


}