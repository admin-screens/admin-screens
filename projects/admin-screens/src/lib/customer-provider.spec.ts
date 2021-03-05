import { CrudDataProvider } from './crud-data-provider.base';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HasId } from './has-id.model';
import { FilterModel } from './filter.model';

export interface Customer extends HasId {
}
export interface CustomerFilter extends FilterModel {
}

@Injectable()
export class CustomerProvider extends CrudDataProvider<Customer, CustomerFilter> {
    api = '/api';
    routes = ['customers'];

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}

@Injectable()
export class MultiRouteCustomerProvider extends CrudDataProvider<Customer, CustomerFilter> {
    api = '/api';
    routes = ['region', 'customers'];

    constructor(httpClient: HttpClient) {
        super(httpClient);
    }
}
