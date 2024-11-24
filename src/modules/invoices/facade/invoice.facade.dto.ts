

export interface GenerateInvoiceFacadeInputDto {
    name: string;
    document: string;
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        name: string;
        price: number;
    }[];
}

export interface FindInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    invoice: {
        id: string;
        name: string;
        document: string;
        street: string;
        number: number;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
        items: {
            id: string;
            name: string;
            price: number;
        }[];
        total: number;
    }
}