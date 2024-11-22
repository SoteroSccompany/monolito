import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object"


type ClientProps = {
    id?: Id;
    name: string;
    email: string;
    addres: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default class Client extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _email: string;
    private _addres: string;

    constructor(props: ClientProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._email = props.email;
        this._addres = props.addres;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get addres() {
        return this._addres;
    }
}