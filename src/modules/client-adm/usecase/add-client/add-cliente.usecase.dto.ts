import Address from "../../../@shared/value-object/address";

export interface AddClienteUseCaseInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: Address;
}

export interface AddClienteUseCaseOutputDto {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}