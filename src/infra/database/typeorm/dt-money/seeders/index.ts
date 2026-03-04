import { DataSource } from "typeorm";
import { DtMoneyDataSource } from "../data-source";
import { TransactionCategory } from "../entities/TransactionCategory";
import { TransactionType } from "../entities/TransactionType";

export class SeederService {
  constructor(private dataSource: DataSource) {}

  async run() {
    await this.seedTypes();
  }

  private async seedTypes() {
    const typeRepository = this.dataSource.getRepository(TransactionType);

    const types = [
      { id: 1, name: "Entrada" },
      { id: 2, name: "Saída" },
    ];

    for (const type of types) {
      const exists = await typeRepository.findOne({ where: { id: type.id } });
      if (!exists) {
        await typeRepository.save(type);
      }
    }
  }
}
