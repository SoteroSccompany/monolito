import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUsecase from "./find-client.usecase";



const client = new Client({
    id: new Id('123'),
    name: "John Doe",
    email: "asdasdsd",
    addres: "1234 Main St"
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
        expect(result.addres).toBe(client.addres);
        expect(result.createdAt).toBe(client.createdAt);
        expect(result.updatedAt).toBe(client.updatedAt);
    });
});