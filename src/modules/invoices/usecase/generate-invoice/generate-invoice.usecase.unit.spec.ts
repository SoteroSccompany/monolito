
import GenerateInvoiceUsecase from "./generate-invoice.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn()
    }
}

const MockFacadeUserAdm = () => {
    return {
        find: jest.fn().mockResolvedValue({ clientId: "c1", name: "Name" }),
        add: jest.fn()
    }
}


describe("Generate invoice usecase unit test", () => {

    it("should generate an invoice", async () => {
        const repository = MockRepository();
        const facade = MockFacadeUserAdm();
        const usecase = new GenerateInvoiceUsecase(repository, facade);
        const input = {
            clientId: "c1",
            items: [
                {
                    name: "Item 1",
                    price: 100
                }
            ]
        }
        const result = await usecase.execute(input);
        expect(repository.add).toHaveBeenCalled();
        expect(facade.find).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.clientId).toBe("c1");
        expect(result.items.length).toBe(1);
        expect(result.items[0].name).toBe("Item 1");
        expect(result.items[0].price).toBe(100);
        expect(result.total).toBe(100);

    });

    it("should throw an error when client not found", async () => {
        const repository = MockRepository();
        const facade = MockFacadeUserAdm();
        facade.find.mockResolvedValue(null);
        const usecase = new GenerateInvoiceUsecase(repository, facade);
        const mockFunctionValidate = jest
            //@ts-expect-error spy on private method
            .spyOn(usecase, 'validateClient')
            //@ts-expect-error - not return never
            .mockRejectedValue(new Error("Client not found"));

        //@ts-expect-error force set clientFacade
        usecase["_facadeUserAdm"] = mockFunctionValidate;

        const input = {
            clientId: "c1",
            items: [
                {
                    name: "Item 1",
                    price: 100
                }
            ]
        }
        await expect(usecase.execute(input)).rejects.toThrow(new Error('Client not found'));
        expect(mockFunctionValidate).toHaveBeenCalled();


    });
});