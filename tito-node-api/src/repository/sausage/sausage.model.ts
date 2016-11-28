import { Document } from 'mongoose';

import { Sausage } from '../../model/identity/sausage';

export interface ISausageModel extends Sausage, Document{};
