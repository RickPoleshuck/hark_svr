import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-easy-vaccine-privacy',
  templateUrl: './easy-vaccine-privacy.component.html',
})
export class EasyVaccinePrivacyComponent {
  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
