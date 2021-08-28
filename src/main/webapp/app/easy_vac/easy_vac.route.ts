import { Routes } from '@angular/router';

import { EasyVacComponent } from './easy_vac.component';

export const easyVacRoute: Routes = [
  {
    path: 'easy_vac',
    component: EasyVacComponent,
    data: {
      pageTitle: 'easy_vac.title',
    },
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
