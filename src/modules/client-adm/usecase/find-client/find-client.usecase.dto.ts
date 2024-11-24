import Address from "../../../@shared/value-object/address";


export interface FindClientUsecaseInputDto {
    id: string;
}

export interface FindClientUsecaseOutputDto {
    id: string;
    name: string;
    email: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}