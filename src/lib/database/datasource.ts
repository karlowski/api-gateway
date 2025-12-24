import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

dotenv.config({
  path: path.resolve(__dirname, '../../../.env')
});

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [path.join(__dirname, './entities/*.entity.{js,ts}')],
  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',
  migrations: [path.join(__dirname, './migrations/*.ts')],
  multipleStatements: true,
};

export default new DataSource({
  ...config,
});

export const databaseModule = TypeOrmModule.forRoot({ 
  ...config 
});
