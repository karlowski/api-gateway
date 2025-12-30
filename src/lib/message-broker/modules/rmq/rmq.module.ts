import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RmqConfigService } from './rmq-config.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RmqConfigService],
  exports: [RmqConfigService],
})
export class RmqModule {}
