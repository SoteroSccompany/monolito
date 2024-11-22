

export interface FindClientUsecaseInputDto {
    id: string;
}

export interface FindClientUsecaseOutputDto {
    id: string;
    name: string;
    email: string;
    addres: string;
    createdAt: Date;
    updatedAt: Date;
}