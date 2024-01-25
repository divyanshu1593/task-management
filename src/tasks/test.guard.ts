import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from 'src/roles.decorator';

@Injectable()
export class TestGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    if (Array.isArray(res.executionFlow)) {
      res.executionFlow.push('in Guard');
    } else {
      res.executionFlow = ['in Guard'];
    }
    if (Array.isArray(req.executionFlow)) {
      req.executionFlow.push('in Guard');
    } else {
      req.executionFlow = ['in Guard'];
    }

    console.log('req', req.executionFlow);
    console.log('res', res.executionFlow);

    console.log('roles', this.reflector.get(Roles, context.getHandler()));

    return true;
  }
}
