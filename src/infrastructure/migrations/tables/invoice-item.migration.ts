import { DataTypes, Sequelize } from 'sequelize';
import { MigrationFn } from 'umzug';

const table: string = 'invoice_items';

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().createTable(table, {
        id: {
            type: DataTypes.STRING(255),
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        invoiceId: {
            type: DataTypes.STRING(255),
            references: {
                model: 'invoices',
                key: 'id'
            },
            allowNull: false,
            onDelete: 'SET NULL'
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })
};

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().dropTable(table)
} 