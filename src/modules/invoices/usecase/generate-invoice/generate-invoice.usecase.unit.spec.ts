
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}


describe("Generate invoice usecase unit test", () => {

    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUsecase(repository);
        const input = {
            name: "Name",
            document: "Document",
            street: "Street",
            number: 123,
            complement: "Complement",
            city: "City",
            state: "State",
            zipCode: "12345678",
            items: [
                {
                    name: "Item 1",
                    price: 100
                }
            ]
        }
        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Name");
        expect(result.document).toBe("Document");
        expect(result.street).toBe("Street");
        expect(result.number).toBe(123);
        expect(result.complement).toBe("Complement");
        expect(result.city).toBe("City");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("12345678");
        expect(result.items.length).toBe(1);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.total).toBe(100);

    });

});