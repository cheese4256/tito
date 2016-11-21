// vendor imports
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt-nodejs';

// custom imports
import { DocumentHelper } from '../document.helper';

// model imports
import { ISausageModel } from './sausage.model';

// declare a schema for this document
let sausageSchema = DocumentHelper.createSchema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  password: {
    type: String,
    required: true
  },
  googleId: {
    type: String
  },
  displayName: {
    type: String
  }
});

// hash the password
sausageSchema.pre('save', function(next) {
  let sausage = this;

  if (!sausage.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(10, (err: any, salt: string) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(sausage.password, salt, null, (err: any, hash: string) => {
      if (err) {
        return next(err);
      }
      sausage.password = hash;
      next();
    });
  });
});

// check for the correct password
sausageSchema.methods.comparePasswords = function (password: string, callback: any) {
  bcrypt.compare(password, this.password, callback);
}

// remove the password from the object we're passing around
sausageSchema.methods.toJSON = function() {
  let sausage = this.toObject();
  delete sausage.password;
  return sausage;
}

// declare and export the document
let document = mongoose.model<ISausageModel>("sausage", sausageSchema);
export { document as SausageDocument };
