import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class TestFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in exception filter');
    } else {
      res.executionFlow = ['in exception filter'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in exception filter');
    } else {
      req.executionFlow = ['in exception filter'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    res.json({
      statusCode: HttpStatus.OK,
    });
  }
}
