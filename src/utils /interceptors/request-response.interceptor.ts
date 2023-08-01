import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestMethod,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoggerService } from '../../logger/logger.service';

@Injectable()
export class RequestResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly logger: LoggerService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx: HttpArgumentsHost = context.switchToHttp();
    const req = ctx.getRequest();
    const { password, ...passwordOmitedBody } = req.body;
    this.logger.sendLog(
      `${req.method} ${req.path} ${JSON.stringify(passwordOmitedBody)}`,
    );
    return next.handle().pipe(map((data) => ({ data })));
  }
}
