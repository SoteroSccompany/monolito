
export interface AddClienteUseCaseInputDto {
    id?: string;
    name: string;
    email: string;
    addres: string;
}

export interface AddClienteUseCaseOutputDto {
    id: string;
    name: string;
    email: string;
    addres: string;
    createdAt: Date;
    updatedAt: Date;
}