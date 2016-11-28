// vendor imports
import * as mongoose from 'mongoose';

// custom imports
import { DocumentHelper } from '../document.helper';

// model imports
import { ITeamModel } from './team.model';

// declare a schema for this document
let teamSchema = DocumentHelper.createSchema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true,
      dropDups: true
    }
  }
});

// declare and export the document
let document = mongoose.model<ITeamModel>("team", teamSchema);
export { document as TeamDocument };
