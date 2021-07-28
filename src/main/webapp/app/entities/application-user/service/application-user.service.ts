import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IApplicationUser, getApplicationUserIdentifier } from '../application-user.model';

export type EntityResponseType = HttpResponse<IApplicationUser>;
export type EntityArrayResponseType = HttpResponse<IApplicationUser[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationUserService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/application-users');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(applicationUser: IApplicationUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationUser);
    return this.http
      .post<IApplicationUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(applicationUser: IApplicationUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationUser);
    return this.http
      .put<IApplicationUser>(`${this.resourceUrl}/${getApplicationUserIdentifier(applicationUser) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(applicationUser: IApplicationUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(applicationUser);
    return this.http
      .patch<IApplicationUser>(`${this.resourceUrl}/${getApplicationUserIdentifier(applicationUser) as number}`, copy, {
        observe: 'response',
      })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IApplicationUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IApplicationUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addApplicationUserToCollectionIfMissing(
    applicationUserCollection: IApplicationUser[],
    ...applicationUsersToCheck: (IApplicationUser | null | undefined)[]
  ): IApplicationUser[] {
    const applicationUsers: IApplicationUser[] = applicationUsersToCheck.filter(isPresent);
    if (applicationUsers.length > 0) {
      const applicationUserCollectionIdentifiers = applicationUserCollection.map(
        applicationUserItem => getApplicationUserIdentifier(applicationUserItem)!
      );
      const applicationUsersToAdd = applicationUsers.filter(applicationUserItem => {
        const applicationUserIdentifier = getApplicationUserIdentifier(applicationUserItem);
        if (applicationUserIdentifier == null || applicationUserCollectionIdentifiers.includes(applicationUserIdentifier)) {
          return false;
        }
        applicationUserCollectionIdentifiers.push(applicationUserIdentifier);
        return true;
      });
      return [...applicationUsersToAdd, ...applicationUserCollection];
    }
    return applicationUserCollection;
  }

  protected convertDateFromClient(applicationUser: IApplicationUser): IApplicationUser {
    return Object.assign({}, applicationUser, {
      lastAccess: applicationUser.lastAccess?.isValid() ? applicationUser.lastAccess.toJSON() : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.lastAccess = res.body.lastAccess ? dayjs(res.body.lastAccess) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((applicationUser: IApplicationUser) => {
        applicationUser.lastAccess = applicationUser.lastAccess ? dayjs(applicationUser.lastAccess) : undefined;
      });
    }
    return res;
  }
}
