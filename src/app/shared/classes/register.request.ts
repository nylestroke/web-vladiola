import { AuthorizeRequest } from './authorize.request';

export interface RegisterRequest extends AuthorizeRequest {
  name: string;
  surname: string;
}
