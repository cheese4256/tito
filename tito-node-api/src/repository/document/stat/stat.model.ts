import { Document } from 'mongoose';

import { Stat } from '../../../model/stat';

export interface IStatModel extends Stat, Document{};
