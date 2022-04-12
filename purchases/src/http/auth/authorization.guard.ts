import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'node:util';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  private AUTH0_AUDIENCE: string;
  private AUTH0_DOMAIN: string;

  constructor(private configService: ConfigService) {
    this.AUTH0_DOMAIN = this.configService.get('AUTH0_DOMAIN') ?? '';
    this.AUTH0_AUDIENCE = this.configService.get('AUTH0_AUDIENCE') ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { request, response } =
      GqlExecutionContext.create(context).getContext();

    const checkJWT = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://${this.AUTH0_DOMAIN}/.well-known/jwks.json`,
        }),
        audience: this.AUTH0_AUDIENCE,
        issuer: `https://${this.AUTH0_DOMAIN}/`,
        algorithms: ['RS256'],
      }),
    );

    try {
      await checkJWT(request, response);
      return true;
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
