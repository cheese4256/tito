import { ModelBase } from '../_model.base';

export interface Sausage extends ModelBase {
  email: string;
  password: string;
  googleId: string;
  displayName: string;
}
