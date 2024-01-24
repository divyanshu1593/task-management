import { NextFunction } from 'express';

export function logger(req: any, res: any, next: NextFunction) {
  if (Array.isArray(res.executionFlow)) {
    res.executionFlow.push('in logger middleware');
  } else {
    res.executionFlow = ['in logger middleware'];
  }
  if (Array.isArray(req.executionFlow)) {
    req.executionFlow.push('in logger middleware');
  } else {
    req.executionFlow = ['in logger middleware'];
  }

  console.log('req', req.executionFlow);
  console.log('res', res.executionFlow);
  next();
}
