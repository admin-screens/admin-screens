import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CrudDataProvider } from './crud-data-provider.base';
import { HasId } from './has-id.model';
import { FilterModel } from './filter.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClrDatagridSortOrder } from '@clr/angular';

interface Customer extends HasId {
}
interface CustomerFilter extends FilterModel {
}
@Injectable()
class CustomerProvider extends CrudDataProvider<Customer, CustomerFilter> {
    api = '/api';
    routes = ['customers'];

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}
@Injectable()
class MultiRouteCustomerProvider extends CrudDataProvider<Customer, CustomerFilter> {
    api = '/api';
    routes = ['region', 'customers'];

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}


describe('CrudDataProvider', () => {
    let customerProvider: CustomerProvider;
    let httpMock: HttpTestingController;
    let multiRouteCustomerProvider: MultiRouteCustomerProvider;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CustomerProvider, MultiRouteCustomerProvider],
            imports: [HttpClientTestingModule]
        });
        customerProvider = TestBed.inject(CustomerProvider);
        multiRouteCustomerProvider = TestBed.inject(MultiRouteCustomerProvider);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(customerProvider).toBeTruthy();
    });

    describe('search', () => {
        it('should call endpoint with correct paging params', () => {
            customerProvider.search({
                skip: 2,
                take: 3,
                sort: null
            }).subscribe();

            httpMock.expectOne('/api/customers?skip=2&take=3');
            httpMock.verify();
            expect().nothing();
        });

        it('should call endpoint with correct sort ASC params', () => {
            customerProvider.search({
                skip: 0,
                take: 1,
                sort: {
                    column: 'name',
                    direction: ClrDatagridSortOrder.ASC
                }
            }).subscribe();

            httpMock.expectOne('/api/customers?skip=0&take=1&sortColumn=name&sortDirection=1');
            httpMock.verify();
            expect().nothing();
        });

        it('should call endpoint with correct sort DESC params', () => {
            customerProvider.search({
                skip: 0,
                take: 1,
                sort: {
                    column: 'name',
                    direction: ClrDatagridSortOrder.DESC
                }
            }).subscribe();

            httpMock.expectOne('/api/customers?skip=0&take=1&sortColumn=name&sortDirection=-1');
            httpMock.verify();
            expect().nothing();
        });

        it('should call endpoint with multiple routes', () => {
            multiRouteCustomerProvider.search({
                skip: 0,
                take: 1,
                sort: null
            }, ['europe']).subscribe();

            httpMock.expectOne('/api/region/europe/customers?skip=0&take=1');
            httpMock.verify();
            expect().nothing();
        });
    });

    describe('create', () => {
        it('should call correct endpoint', () => {
            customerProvider.create({
                id: null
            }).subscribe();

            const call = httpMock.expectOne('/api/customers');
            expect(call.request.method).toBe('POST');

            httpMock.verify();
        });

        it('should call correct endpoint with multiple routes', () => {
            multiRouteCustomerProvider.create({
                id: null
            }, ['parentId']).subscribe();

            const call = httpMock.expectOne('/api/region/parentId/customers');
            expect(call.request.method).toBe('POST');

            httpMock.verify();
        });
    });

    describe('update', () => {
        it('should call correct endpoint', () => {
            customerProvider.update({
                id: 'abc'
            }).subscribe();

            const call = httpMock.expectOne('/api/customers/abc');
            expect(call.request.method).toBe('PUT');

            httpMock.verify();
        });

        it('should call correct endpoint with multiple routes', () => {
            multiRouteCustomerProvider.update({
                id: 'abc'
            }, ['parentId']).subscribe();

            const call = httpMock.expectOne('/api/region/parentId/customers/abc');
            expect(call.request.method).toBe('PUT');

            httpMock.verify();
        });
    });


    describe('remove', () => {
        it('should call correct endpoint', () => {
            customerProvider.delete('efg').subscribe();

            const call = httpMock.expectOne('/api/customers/efg');
            expect(call.request.method).toBe('DELETE');

            httpMock.verify();
        });

        it('should call correct endpoint with multiple routes', () => {
            multiRouteCustomerProvider.delete('efg', ['parentId']).subscribe();

            const call = httpMock.expectOne('/api/region/parentId/customers/efg');
            expect(call.request.method).toBe('DELETE');

            httpMock.verify();
        });
    });
});
