import { SortDefinition } from './sort-definition.model';
import { Observable } from 'rxjs';
import { ClrLoadingState } from '@clr/angular';
import { PageSelection } from './paged-list/page-selection.model';


export interface EntityLoader<TEntity, TEntityFilter> {
    loadingState: Observable<ClrLoadingState>;
    totalRecords: Observable<number>;
    totalPages: Observable<number>;

    sort: Observable<SortDefinition>;
    page: Observable<number>;
    pageSize: Observable<number>;
    filter: Observable<TEntityFilter>;
    records: Observable<TEntity[]>;

    updateFilter(filter: TEntityFilter): void;
    updatePage(page: number): void;
    updatePageSize(pageSize: number): void;
    updateSort(sort: SortDefinition): void;
    update(state: PageSelection): void;
}
