import { SortDefinition } from './sort-definition.model';
import { Observable } from 'rxjs';
import { ClrDatagridStateInterface, ClrLoadingState } from '@clr/angular';


export interface EntityLoader<TEntity, TEntityFilter> {
    loadingState: ClrLoadingState;
    totalRecords: Observable<number>;
    totalPages: Observable<number>;

    sort: Observable<SortDefinition>;
    page: Observable<number>;
    pageSize: Observable<number>;
    filter: Observable<TEntityFilter>;
    records: Observable<TEntity[]>;

    updateFilter(filter: TEntityFilter);
    updatePage(page: number);
    updatePageSize(pageSize: number);
    updateSort(sort: SortDefinition);
    update(dataGridState: ClrDatagridStateInterface)
}
