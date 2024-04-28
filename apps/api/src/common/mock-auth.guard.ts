import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MockAuthGuard implements CanActivate {
  static userId = 1;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = {
      sub: MockAuthGuard.userId,
    };
    return true;
  }
}
