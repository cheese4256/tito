import { Document } from 'mongoose';

import { Stat } from '../../model/tito/stat';

export interface IStatModel extends Stat, Document{};
