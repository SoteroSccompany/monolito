import { BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import InvoiceItemModel from "./invoice-item.model";
import ClientModel from "../../client-adm/repository/client.model";

@Table({
    tableName: 'invoices',
    timestamps: true,
})
export default class InvoiceModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @ForeignKey(() => ClientModel)
    @Column({ allowNull: false })
    declare clientId: string;

    @BelongsTo(() => ClientModel, { as: 'client' })
    declare client: ClientModel;

    @HasMany(() => InvoiceItemModel, { as: 'items' })
    declare items: InvoiceItemModel[];

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;

    // @Column({ allowNull: true })
    // declare deletedAt?: Date; // Paranoid

}