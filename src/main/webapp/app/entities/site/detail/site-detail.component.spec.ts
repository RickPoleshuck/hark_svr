import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SiteDetailComponent } from './site-detail.component';

describe('Component Tests', () => {
  describe('Site Management Detail Component', () => {
    let comp: SiteDetailComponent;
    let fixture: ComponentFixture<SiteDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [SiteDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ site: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(SiteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SiteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load site on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.site).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
