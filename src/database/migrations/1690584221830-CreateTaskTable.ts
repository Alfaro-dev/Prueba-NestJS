import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from 'typeorm';

export class CreateTaskTable1690584221830 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'enum',
                        enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
                        default: "'TO_DO'",
                    },
                ],
            }),
        );

        await queryRunner.addColumn(
            'tasks',
            new TableColumn({
                name: 'userId',
                type: 'integer',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'tasks',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('tasks');
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);
        await queryRunner.dropForeignKey('tasks', foreignKey);
        await queryRunner.dropColumn('tasks', 'userId');
        await queryRunner.dropTable('tasks');
    }
}
