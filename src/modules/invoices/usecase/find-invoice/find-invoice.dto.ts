

interface FindInvoiceInputDto {
    id: string;
}

interface FindInvoiceOutputDto {
    id: string;
    clientId: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
    total: number;
}