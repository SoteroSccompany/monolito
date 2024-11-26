import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";


@Table(
    {
        modelName: 'checkout-table',
        tableName: 'checkout',
        timestamps: false
    }
)
export default class CheckOutModel extends Model {

    @PrimaryKey
    @Column({ allowNull: false })
    declare id: string;

    @Column({ allowNull: false })
    declare clientId: string;

    @Column({ allowNull: false })
    declare total: string;

    @Column({ allowNull: false })
    declare status: string;

    @Column({ allowNull: false })
    declare createdAt: Date;

    @Column({ allowNull: false })
    declare updatedAt: Date;
}