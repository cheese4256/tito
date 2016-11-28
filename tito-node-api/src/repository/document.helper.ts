import * as mongoose from 'mongoose';

export class DocumentHelper {
  public static createSchema(definition: any): mongoose.Schema {
    let schema = new mongoose.Schema(definition);

    schema.virtual('id').get(function() { return this._id.toString(); });
    schema.set('toJSON', {
        virtuals: true
    });

    return schema;
  }
}
