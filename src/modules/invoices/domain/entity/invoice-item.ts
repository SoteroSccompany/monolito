
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";


export default class InvoiceItem extends BaseEntity {

    private _name: string;
    private _price: number;

    constructor(name: string, price: number, id?: Id, createdAt?: Date, updatedAt?: Date) {
        super(id, createdAt, updatedAt);
        this._name = name;
        this._price = price;
        this.validate();
    }

    validate(): void {
        if (!this._name) {
            throw new Error('Name is required');
        }
        if (!this._price) {
            throw new Error('Price is required');
        }

        if (this._price < 100) {
            throw new Error('Price must be greater than 100');
        }
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

}