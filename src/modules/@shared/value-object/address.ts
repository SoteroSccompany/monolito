import ValueObject from "../../@shared/domain/value-object/value-object.interface";


export default class Address implements ValueObject {

    private _street: string;
    private _number: number;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(street: string, number: number, complement: string, city: string, state: string, zipCode: string) {
        this._street = street;
        this._number = number;
        this._complement = complement;
        this._city = city;
        this._state = state;
        this._zipCode = zipCode;
        this.validate();
    }

    validate(): void {
        if (!this._street) {
            throw new Error('Street is required');
        }
        if (!this._number) {
            throw new Error('Number is required');
        }
        if (!this._city) {
            throw new Error('City is required');
        }
        if (!this._state) {
            throw new Error('State is required');
        }
        if (!this._zipCode) {
            throw new Error('ZipCode is required');
        }
        if (this._zipCode.length !== 8) {
            throw new Error('ZipCode must have 8 characters');
        }
        if (!this._complement) {
            throw new Error('Complement is required');
        }
    }

    toString(): string {
        return `${this._street}, ${this._number}, ${this._complement}, ${this._city}, ${this._state}, ${this._zipCode}`;
    }

    toJson(address: string): Address {
        const fields = address.split(", ");
        return new Address(fields[0], parseInt(fields[1]), fields[2], fields[3], fields[4], fields[5]);
    }

    get street(): string {
        return this._street;
    }

    get number(): number {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zipCode(): string {
        return this._zipCode;
    }



}