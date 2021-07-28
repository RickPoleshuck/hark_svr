import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISite } from '../site.model';

@Component({
  selector: 'jhi-site-detail',
  templateUrl: './site-detail.component.html',
})
export class SiteDetailComponent implements OnInit {
  site: ISite | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ site }) => {
      this.site = site;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
