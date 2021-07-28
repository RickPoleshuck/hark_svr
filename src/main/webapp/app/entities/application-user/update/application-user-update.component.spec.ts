jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ApplicationUserService } from '../service/application-user.service';
import { IApplicationUser, ApplicationUser } from '../application-user.model';

import { ApplicationUserUpdateComponent } from './application-user-update.component';

describe('Component Tests', () => {
  describe('ApplicationUser Management Update Component', () => {
    let comp: ApplicationUserUpdateComponent;
    let fixture: ComponentFixture<ApplicationUserUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let applicationUserService: ApplicationUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ApplicationUserUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ApplicationUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ApplicationUserUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      applicationUserService = TestBed.inject(ApplicationUserService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const applicationUser: IApplicationUser = { id: 456 };

        activatedRoute.data = of({ applicationUser });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(applicationUser));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ApplicationUser>>();
        const applicationUser = { id: 123 };
        jest.spyOn(applicationUserService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ applicationUser });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: applicationUser }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(applicationUserService.update).toHaveBeenCalledWith(applicationUser);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ApplicationUser>>();
        const applicationUser = new ApplicationUser();
        jest.spyOn(applicationUserService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ applicationUser });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: applicationUser }));
        saveSubject.complete();

        // THEN
        expect(applicationUserService.create).toHaveBeenCalledWith(applicationUser);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ApplicationUser>>();
        const applicationUser = { id: 123 };
        jest.spyOn(applicationUserService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ applicationUser });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(applicationUserService.update).toHaveBeenCalledWith(applicationUser);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
