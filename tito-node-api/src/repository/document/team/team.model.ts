import { Document } from 'mongoose';

import { Team } from '../../../model/team';

export interface ITeamModel extends Team, Document{};
