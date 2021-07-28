import * as dayjs from 'dayjs';
import { ISite } from 'app/entities/site/site.model';

export interface IApplicationUser {
  id?: number;
  lastAccess?: dayjs.Dayjs | null;
  ipAddress?: string | null;
  sites?: ISite[] | null;
}

export class ApplicationUser implements IApplicationUser {
  constructor(
    public id?: number,
    public lastAccess?: dayjs.Dayjs | null,
    public ipAddress?: string | null,
    public sites?: ISite[] | null
  ) {}
}

export function getApplicationUserIdentifier(applicationUser: IApplicationUser): number | undefined {
  return applicationUser.id;
}
