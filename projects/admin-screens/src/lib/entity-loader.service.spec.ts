import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { CrudDataProvider } from './crud-data-provider.base';
import { HasId } from './has-id.model';
import { FilterModel } from './filter.model';
import { EntityLoaderBase } from './entity-loader.base';
import { CustomerProvider } from './customer-provider.spec';
import { ClrLoadingState } from '@clr/angular';


describe('EntityLoader', () => {
    let entityLoader: EntityLoaderBase<HasId, FilterModel>;
    let crudDataProviderSpy: jasmine.SpyObj<CrudDataProvider<HasId, FilterModel>>;

    beforeEach(() => {
        const dataProviderSpy = jasmine.createSpyObj('CrudDataProvider', [
            'search', 'create', 'update', 'delete', 'get'
        ]);
        TestBed.configureTestingModule({
            providers: [
                EntityLoaderBase,
                {
                    provide: CrudDataProvider,
                    useValue: dataProviderSpy
                }
            ],
            imports: []
        });

        entityLoader = TestBed.inject(EntityLoaderBase);
        crudDataProviderSpy = TestBed.inject(CrudDataProvider) as jasmine.SpyObj<CrudDataProvider<HasId, FilterModel>>;
    });

    it('should be created', () => {
        expect(entityLoader).toBeTruthy();
    });

    it('should have initial state default', () => {
        expect(entityLoader.loadingState.value).toBe(ClrLoadingState.DEFAULT);
    });
});
