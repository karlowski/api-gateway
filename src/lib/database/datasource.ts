import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const datasource = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    console.log('THIS IS VARIABLES: ');
    console.log(configService.get<string>('DB_HOST'));
    console.log(configService.get<string>('DB_PORT'));
    console.log(configService.get<string>('DB_USER'));
    console.log(configService.get<string>('DB_PASSWORD'));
    console.log(configService.get<string>('DB_NAME'));
    return ({
      type: 'mysql',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_NAME'),
      entities: [],
      migrations: [],
      synchronize: false,
      cache: true,
      logging: true,
    })
  },
});
