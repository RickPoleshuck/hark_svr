import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EasyVaccineComponent } from '../main/easy-vaccine.component';
import { EasyVaccinePrivacyComponent } from '../privacy/easy-vaccine-privacy.component';

const easyVaccineRoute: Routes = [
  {
    path: '',
    component: EasyVaccineComponent,
  },
  {
    path: ':id/view',
    component: EasyVaccinePrivacyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(easyVaccineRoute)],
  exports: [RouterModule],
})
export class EasyVaccineRoutingModule {}
