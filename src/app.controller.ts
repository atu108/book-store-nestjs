import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './utils /decorators/public.decorator';

@Controller()
@ApiTags('Application status')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Public()
  @Get('/health')
  health() {
    return this.appService.health();
  }
}
