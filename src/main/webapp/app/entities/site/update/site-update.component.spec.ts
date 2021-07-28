jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { SiteService } from '../service/site.service';
import { ISite, Site } from '../site.model';
import { IApplicationUser } from 'app/entities/application-user/application-user.model';
import { ApplicationUserService } from 'app/entities/application-user/service/application-user.service';

import { SiteUpdateComponent } from './site-update.component';

describe('Component Tests', () => {
  describe('Site Management Update Component', () => {
    let comp: SiteUpdateComponent;
    let fixture: ComponentFixture<SiteUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let siteService: SiteService;
    let applicationUserService: ApplicationUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [SiteUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(SiteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SiteUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      siteService = TestBed.inject(SiteService);
      applicationUserService = TestBed.inject(ApplicationUserService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call ApplicationUser query and add missing value', () => {
        const site: ISite = { id: 456 };
        const user: IApplicationUser = { id: 3111 };
        site.user = user;

        const applicationUserCollection: IApplicationUser[] = [{ id: 55195 }];
        jest.spyOn(applicationUserService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationUserCollection })));
        const additionalApplicationUsers = [user];
        const expectedCollection: IApplicationUser[] = [...additionalApplicationUsers, ...applicationUserCollection];
        jest.spyOn(applicationUserService, 'addApplicationUserToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ site });
        comp.ngOnInit();

        expect(applicationUserService.query).toHaveBeenCalled();
        expect(applicationUserService.addApplicationUserToCollectionIfMissing).toHaveBeenCalledWith(
          applicationUserCollection,
          ...additionalApplicationUsers
        );
        expect(comp.applicationUsersSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const site: ISite = { id: 456 };
        const user: IApplicationUser = { id: 85867 };
        site.user = user;

        activatedRoute.data = of({ site });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(site));
        expect(comp.applicationUsersSharedCollection).toContain(user);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Site>>();
        const site = { id: 123 };
        jest.spyOn(siteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ site });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: site }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(siteService.update).toHaveBeenCalledWith(site);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Site>>();
        const site = new Site();
        jest.spyOn(siteService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ site });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: site }));
        saveSubject.complete();

        // THEN
        expect(siteService.create).toHaveBeenCalledWith(site);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Site>>();
        const site = { id: 123 };
        jest.spyOn(siteService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ site });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(siteService.update).toHaveBeenCalledWith(site);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackApplicationUserById', () => {
        it('Should return tracked ApplicationUser primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackApplicationUserById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
