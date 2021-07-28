jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ISite, Site } from '../site.model';
import { SiteService } from '../service/site.service';

import { SiteRoutingResolveService } from './site-routing-resolve.service';

describe('Service Tests', () => {
  describe('Site routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: SiteRoutingResolveService;
    let service: SiteService;
    let resultSite: ISite | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(SiteRoutingResolveService);
      service = TestBed.inject(SiteService);
      resultSite = undefined;
    });

    describe('resolve', () => {
      it('should return ISite returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSite = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSite).toEqual({ id: 123 });
      });

      it('should return new ISite if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSite = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultSite).toEqual(new Site());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Site })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultSite = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultSite).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
