import Address from "../../@shared/value-object/address";


export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    document: string;
    address: Address;
}



export interface FindClientFacadeInputDto {
    clientId: string;
}

export interface FindClientFacadeOutputDto {
    clientId: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
}

