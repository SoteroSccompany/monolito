

export interface GenerateInvoiceFacadeInputDto {
    clientId: string;
    items: {
        name: string;
        price: number;
    }[];
}

export interface GenerateInvoiceFacadeOutPutDto {
    id: string;
    clientId: string;
    items: {
        productId: string;
    }[];
}

export interface FindInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    invoice: {
        id: string;
        clientId: string;
        items: {
            id: string;
            name: string;
            price: number;
        }[];
        total: number;
    }
}