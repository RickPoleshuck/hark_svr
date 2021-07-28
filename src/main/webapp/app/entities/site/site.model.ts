import * as dayjs from 'dayjs';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { SiteStatus } from 'app/entities/enumerations/site-status.model';

export interface ISite {
  id?: number;
  status?: SiteStatus | null;
  lastCheck?: dayjs.Dayjs | null;
  user?: IApplicationUser | null;
}

export class Site implements ISite {
  constructor(
    public id?: number,
    public status?: SiteStatus | null,
    public lastCheck?: dayjs.Dayjs | null,
    public user?: IApplicationUser | null
  ) {}
}

export function getSiteIdentifier(site: ISite): number | undefined {
  return site.id;
}
