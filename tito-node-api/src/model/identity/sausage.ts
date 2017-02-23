import { ModelBase } from '../_model.base';

import { Credential } from './credential';

export interface Sausage extends ModelBase {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  googleId: string;
  username: string;
  password: string;
  credential: Credential;
}
