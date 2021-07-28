import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { SiteComponent } from '../list/site.component';
import { SiteDetailComponent } from '../detail/site-detail.component';
import { SiteUpdateComponent } from '../update/site-update.component';
import { SiteRoutingResolveService } from './site-routing-resolve.service';

const siteRoute: Routes = [
  {
    path: '',
    component: SiteComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SiteDetailComponent,
    resolve: {
      site: SiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SiteUpdateComponent,
    resolve: {
      site: SiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SiteUpdateComponent,
    resolve: {
      site: SiteRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(siteRoute)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
