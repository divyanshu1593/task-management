import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class TestFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    const status = exception.getStatus();

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

    res.status(status).json({
      statusCode: status,
    });
  }
}
