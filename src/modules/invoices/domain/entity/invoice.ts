import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";

import InvoiceItem from "./invoice-item";



export default class Invoice extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItem[];

    constructor(name: string, document: string, address: Address, items: InvoiceItem[], id?: Id
        , createdAt?: Date, updatedAt?: Date
    ) {
        super(id, createdAt, updatedAt);
        this._name = name;
        this._document = document;
        this._address = address;
        this._items = items;
        this.validate();
    }

    validate(): void {
        if (!this._name) {
            throw new Error('Name is required');
        }
        if (!this._document) {
            throw new Error('Document is required');
        }
        if (!this._address) {
            throw new Error('Address is required');
        }
        if (!this._items) {
            throw new Error('Items is required');
        }
        if (this._items.length === 0) {
            throw new Error('Items is required');
        }
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
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