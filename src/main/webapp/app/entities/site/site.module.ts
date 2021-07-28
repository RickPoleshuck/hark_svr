import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SiteComponent } from './list/site.component';
import { SiteDetailComponent } from './detail/site-detail.component';
import { SiteUpdateComponent } from './update/site-update.component';
import { SiteDeleteDialogComponent } from './delete/site-delete-dialog.component';
import { SiteRoutingModule } from './route/site-routing.module';

@NgModule({
  imports: [SharedModule, SiteRoutingModule],
  declarations: [SiteComponent, SiteDetailComponent, SiteUpdateComponent, SiteDeleteDialogComponent],
  entryComponents: [SiteDeleteDialogComponent],
})
export class SiteModule {}
