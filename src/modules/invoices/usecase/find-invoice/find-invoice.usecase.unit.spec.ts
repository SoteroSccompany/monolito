import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";
import Invoice from "../../domain/entity/invoice";
import InvoiceItem from "../../domain/entity/invoice-item";
import FindInvoiceUsecase from "./find-invoice.usecase";



const MockRepository = () => {
    return {
        find: jest.fn(),
        add: jest.fn(),
    }
}

describe('FindInvoiceUsecase unit test', () => {

    it("should find an invoice", async () => {
        const invoice = new Invoice("Name", "Document", new Address("Street", 123, "Complement", "City", "State", "12345678"), [
            new InvoiceItem("Item 1", 100)
        ], new Id('1'), new Date(), new Date());
        const repository = MockRepository();
        repository.find.mockResolvedValue(Promise.resolve(invoice));
        const usecase = new FindInvoiceUsecase(repository);
        const input = { id: "1" };
        const result = await usecase.execute(input);
        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Name");
        expect(result.document).toBe("Document");
        expect(result.street).toBe("Street");
        expect(result.number).toBe(123);
        expect(result.complement).toBe("Complement");
        expect(result.city).toBe("City");
        expect(result.state).toBe("State");
        expect(result.zipCode).toBe("12345678");
        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(100);
    });

});