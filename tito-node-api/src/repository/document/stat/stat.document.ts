// vendor imports
import * as mongoose from 'mongoose';

// custom imports
import { DocumentHelper } from '../document.helper';

// model imports
import { IStatModel } from './stat.model';

// declare a schema for this document
let statSchema = DocumentHelper.createSchema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  },
  value: {
    type: String,
    required: true
  }
});

// declare and export the document
let document = mongoose.model<IStatModel>("stat", statSchema);
export { document as StatDocument };
