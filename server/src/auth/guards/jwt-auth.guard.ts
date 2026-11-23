import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(context: ExecutionContext) {
  const req = context.switchToHttp().getRequest();

  console.log("AUTH HEADER:", req.headers.authorization);

  return super.canActivate(context);
}

  handleRequest(
    err: any,
    user: any,
    info: any,
  ) {
    console.log("ERR:", err);
    console.log("USER:", user);
    console.log("INFO:", info);

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}