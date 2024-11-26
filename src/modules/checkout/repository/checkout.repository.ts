import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import CheckOutModel from "./checkout.model";



export default class CheckoutRepository implements CheckoutGateway {
    async addOrder(order: Order): Promise<void> {
        try {
            await CheckOutModel.create({
                id: order.id.id,
                clientId: order.client.id.id,
                total: order.total,
                status: order.status,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            });

        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    findOrder(id: string): Promise<Order> {
        try {
            throw new Error("Method not implemented.");
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}