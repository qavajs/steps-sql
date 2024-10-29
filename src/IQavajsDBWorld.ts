import { IQavajsWorld} from '@qavajs/core';
import DBClient from './clients/DBClient';

export interface IQavajsDBWorld extends IQavajsWorld {
    dbClients: Record<string, DBClient>
}