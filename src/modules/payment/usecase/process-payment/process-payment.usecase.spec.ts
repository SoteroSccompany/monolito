import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentUsecase from "./process-payment.usecase";





const MockRepository = () => {
    return {
        save: jest.fn()
    }
}

describe("Process payment usecase unit test", () => {

    it("should approve a transaction", async () => {

        const paymentRepository = MockRepository();
        const transaction = new Transaction({
            id: new Id('1'),
            amount: 100,
            orderId: '1',
            status: 'approved',
        })
        paymentRepository.save.mockResolvedValue(Promise.resolve(transaction));
        const usecase = new ProcessPaymentUsecase(paymentRepository);
        const input = {
            amount: 100,
            orderId: '1'
        }
        const result = await usecase.execute(input);
        expect(result.transactionId).toBe(transaction.id.id)
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe('approved');
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe('1');
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it("should decline a transaction", async () => {
        const paymentRepository = MockRepository();
        const transaction = new Transaction({
            id: new Id('1'),
            amount: 50,
            orderId: '1',
            status: 'declined',
        })
        paymentRepository.save = jest.fn().mockResolvedValue(Promise.resolve(transaction));

        const usecase = new ProcessPaymentUsecase(paymentRepository);
        const input = {
            amount: 50,
            orderId: '1'
        }
        const result = await usecase.execute(input);
        expect(result.transactionId).toBe(transaction.id.id)
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe('declined');
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe('1');
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    })


});