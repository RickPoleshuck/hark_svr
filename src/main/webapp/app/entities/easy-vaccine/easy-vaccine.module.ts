import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { EasyVaccineComponent } from './main/easy-vaccine.component';
import { EasyVaccinePrivacyComponent } from './privacy/easy-vaccine-privacy.component';
import { EasyVaccineRoutingModule } from './route/easy-vaccine-routing.module';

@NgModule({
  imports: [SharedModule, EasyVaccineRoutingModule],
  declarations: [EasyVaccineComponent, EasyVaccinePrivacyComponent],
})
export class EasyVaccineModule {}
