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
        const invoice = new Invoice("c1", [
            new InvoiceItem("Item 1", 100)
        ], new Id('1'), new Date(), new Date());
        const repository = MockRepository();
        repository.find.mockResolvedValue(Promise.resolve(invoice));
        const usecase = new FindInvoiceUsecase(repository);
        const input = { id: "1" };
        const result = await usecase.execute(input);
        expect(result).toBeDefined();
        expect(result.id).toBe("1");
        expect(result.clientId).toBe("c1");
        expect(result.items.length).toBe(1);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.createdAt).toBeDefined();
        expect(result.updatedAt).toBeDefined();
        expect(result.total).toBe(100);
    });

});