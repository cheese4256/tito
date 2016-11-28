// vendor imports
import * as mongoose from 'mongoose';

// custom imports
import { DocumentHelper } from '../document.helper';

// model imports
import { ISausageModel } from './sausage.model';

let credentialSchema = DocumentHelper.createSchema({
  passwordEncrypted: {
    type: String
    // type: String,
    // required: true
  },
  passwordSalt: {
    type: String
    // type: String,
    // required: true
  },
});

let sausageSchema = DocumentHelper.createSchema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  googleId: {
    type: String
  },
  displayName: {
    type: String
  },
  credential: {
    type: credentialSchema
  }
});

// declare and export the document
let document = mongoose.model<ISausageModel>("sausage", sausageSchema);
export { document as SausageDocument };
