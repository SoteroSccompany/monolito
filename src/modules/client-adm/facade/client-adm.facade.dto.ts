

export interface AddClientFacadeInputDto {
    id?: string;
    name: string;
    email: string;
    addres: string;
}



export interface FindClientFacadeInputDto {
    clientId: string;
}

export interface FindClientFacadeOutputDto {
    clientId: string;
    name: string;
    email: string;
    addres: string;
    createdAt: Date;
    updatedAt: Date;
}

