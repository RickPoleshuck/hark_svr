import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'jhi-easy-vac',
  templateUrl: './easy_vac.component.html',
})
export class EasyVacComponent {
  constructor(private route: ActivatedRoute) {}
}
