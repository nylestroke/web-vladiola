import { AuthorizeRequest } from './authorize.request';

export interface ResetPasswordRequest extends AuthorizeRequest {
  recover_token: string;
}
