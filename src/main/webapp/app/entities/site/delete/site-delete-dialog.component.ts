import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISite } from '../site.model';
import { SiteService } from '../service/site.service';

@Component({
  templateUrl: './site-delete-dialog.component.html',
})
export class SiteDeleteDialogComponent {
  site?: ISite;

  constructor(protected siteService: SiteService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.siteService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
