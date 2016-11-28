import { Document } from 'mongoose';

import { Team } from '../../model/tito/team';

export interface ITeamModel extends Team, Document{};
