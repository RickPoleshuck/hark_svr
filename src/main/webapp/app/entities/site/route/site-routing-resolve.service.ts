import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ISite, Site } from '../site.model';
import { SiteService } from '../service/site.service';

@Injectable({ providedIn: 'root' })
export class SiteRoutingResolveService implements Resolve<ISite> {
  constructor(protected service: SiteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISite> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((site: HttpResponse<Site>) => {
          if (site.body) {
            return of(site.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Site());
  }
}
