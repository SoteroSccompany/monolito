import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/value-object/address";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";



const client = new Client({
    id: new Id('123'),
    name: "John Doe",
    email: "asdasdsd",
    document: "123123123",
    address: new Address("street", 123, "complement", "city", "state", "30770400"),
});


const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
        add: jest.fn()
    }
}

describe("find client usecase unit test", () => {
    it("should find a client", async () => {
        const clientRepository = MockRepository();
        const usecase = new FindClientUsecase(clientRepository);
        const input = { id: "123" };
        const result = await usecase.execute(input);
        expect(clientRepository.find).toHaveBeenCalled();
        expect(result.id).toBe(client.id.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.address.street).toBe(client.address.street);
        expect(result.address.number).toBe(client.address.number);
        expect(result.address.complement).toBe(client.address.complement);
        expect(result.address.city).toBe(client.address.city);
        expect(result.address.state).toBe(client.address.state);
        expect(result.address.zipCode).toBe(client.address.zipCode);
        expect(result.createdAt).toBe(client.createdAt);
        expect(result.updatedAt).toBe(client.updatedAt);
    });
});