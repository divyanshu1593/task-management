import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in interceptor');
    } else {
      res.executionFlow = ['in interceptor'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in interceptor');
    } else {
      req.executionFlow = ['in interceptor'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    return next.handle().pipe(
      tap(() => {
        if (Array.isArray(res.executionFlow)) {
          res.executionFlow.push('in interceptor');
        } else {
          res.executionFlow = ['in interceptor'];
        }
        if (Array.isArray(req.executionFlow)) {
          req.executionFlow.push('in interceptor');
        } else {
          req.executionFlow = ['in interceptor'];
        }

        console.log('req', req.executionFlow);
        console.log('res', res.executionFlow);
      }),
      map((data) => instanceToPlain(data)),
    );
  }
}
