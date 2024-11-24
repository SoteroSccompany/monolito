export interface GenerateInvoiceUseCaseInputDto {
    clientId: string;
    items: {
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceUseCaseOutputDto {
    id: string;
    clientId: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}