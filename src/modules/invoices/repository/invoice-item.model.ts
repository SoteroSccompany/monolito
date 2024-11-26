import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";


@Table({
    tableName: 'invoice_items',
    timestamps: true
})
export default class InvoiceItemModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare name: string;

    @Column({ allowNull: false })
    declare price: number;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoiceId: string;

    @BelongsTo(() => InvoiceModel, { as: 'invoice' })
    declare invoice: InvoiceModel;

    // @Column({ allowNull: true })
    // declare deletedAt?: Date; // Paranoid

}