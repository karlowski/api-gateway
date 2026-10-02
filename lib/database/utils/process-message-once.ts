import { DataSource, EntityManager } from 'typeorm';

import { ProcessedMessage } from '../entities/processed-message.entity';

export const processMessageOnce = <T>(
  dataSource: DataSource,
  consumer: string,
  messageId: string,
  insert: (EntityManager: EntityManager) => Promise<T>
) => {
  return dataSource.transaction(async (entityManager) => {
    try {
      await entityManager.insert(ProcessedMessage, { consumer, messageId });
    } catch (error) {
      throw error;
    }

    await insert(entityManager);

    return true;
  });
}
